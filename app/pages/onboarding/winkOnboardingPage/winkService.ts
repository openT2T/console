import {Injectable} from "angular2/core";
import {Http, HTTP_PROVIDERS, Response, Headers, RequestOptions} from "angular2/http";
import "rxjs/Rx";
import {WinkConfig} from "./winkConfig";
import {WinkUser} from "./model/winkUser";
import {WinkDeviceEnumerationResponse} from "./model/winkDeviceEnumerationResponse";
import {WinkDevice} from "./model/winkDevice";

@Injectable()
export class WinkService {

    // reference to the currently signed in user.
    public user: WinkUser;

    // reference to the set of known devices on the WINK service for this suer.
    public devices: WinkDevice[];

    // ctor
    constructor(public http: Http) {
        // init user state to start with.
        this.clearUserState();
    }

    // signs out the user.
    public signOut() {
        this.clearUserState();
    }

    // clears in-memory state object.
    private clearUserState() {
        this.user = new WinkUser();
    }

    // returns auth options for http requests after sign-in
    public signedInHttpAuthOptions() {
        let headers = new Headers({
            "Authorization": "BEARER " + this.user.access_token
        });

        return new RequestOptions({ headers: headers });
    }

    // initiates signing-in a user with the given username and password.
    public initiateSignIn(email: string, password: string): Promise<WinkUser> {

        let postData = JSON.stringify({
            "client_id": WinkConfig.CLIENT_ID,
            "client_secret": WinkConfig.CLIENT_SECRET,
            "username": email,
            "password": password,
            "grant_type": "password"
        });

        let headers = new Headers({
            "Content-Type": "application/json"
        });

        let options = new RequestOptions({ headers: headers });

        return this.http.post(WinkConfig.API_ENDPOINT + "/oauth2/token", postData, options)
            .toPromise()
            .then((res) => {
                return this.handleSignInResponse(res);
            }).catch((err) => {
                this.user.isSignedIn = false;
                console.log("Error: " + err.text());
                return Promise.reject<WinkUser>(err);
            });
    }

    // handles the sign-in response.
    private handleSignInResponse(res: Response): Promise<WinkUser> {

        console.log("Sign in response status: " + res.status);

        if (res.status !== 200) {
            this.user.isSignedIn = false;
            console.log("Error: failed to sign in: \n" + res.text());
            return Promise.reject<WinkUser>(res);
        }
        else {
            this.user = JSON.parse(res.text());
            this.user.isSignedIn = true;

            console.log("Success: Signed in!");
            return Promise.resolve<WinkUser>(this.user);
        }
    }

    // initiates enumerating devices for the user (filtered by devices that have the specified id key
    public initiateEnumerateDevices(idKeyFilter: string): Promise<WinkDevice[]> {

        return this.http.get(WinkConfig.API_ENDPOINT + "/users/me/wink_devices", this.signedInHttpAuthOptions())
            .toPromise()
            .then((res) => {
                return this.handleEnumerateDevicesResponse(res, idKeyFilter);
            }).catch((err) => {
                this.user.isSignedIn = false;
                console.log("Error: " + err.text());
                return Promise.reject<WinkUser>(err);
            });
    }

    // handles the enumerate devices response.
    private handleEnumerateDevicesResponse(res: Response, idKeyFilter: string): Promise<WinkDevice[]> {

        console.log("Enumerate devices response status: " + res.status);

        if (res.status !== 200) {
            this.user.isSignedIn = false;
            console.log("Error: failed to enumerate devices: \n" + res.text());
            return Promise.reject<WinkDevice[]>(res);
        }
        else {

            let response: WinkDeviceEnumerationResponse = JSON.parse(res.text());

            // filter down to devices that have the specified ID Key filter
            // (e.g. light_bulb_id if we are looking for lightbulbs)
            this.devices = response.data.filter((WinkDevice) => {
                return !!WinkDevice[idKeyFilter];
            });

            console.log("Success: Devices enumerated");

            return Promise.resolve<WinkDevice[]>(this.devices);
        }
    }
}