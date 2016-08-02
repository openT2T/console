import {Storage, LocalStorage} from "ionic-angular";
import {Http, HTTP_PROVIDERS, Response, Headers, RequestOptions} from "@angular/http";
import {JwtHelper, tokenNotExpired} from "angular2-jwt";
import {Injectable, NgZone} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {Config} from "../config";

// Avoid name not found warnings
declare var Auth0: any;
declare var Auth0Lock: any;

@Injectable()
export class AuthService {

  jwtHelper: JwtHelper = new JwtHelper();

  auth0 = new Auth0({ clientID: Config.Auth0.CLIENT_ID, domain: Config.Auth0.DOMAIN });

  lock = new Auth0Lock(Config.Auth0.CLIENT_ID, Config.Auth0.DOMAIN, {
    auth: {
      redirect: false,
      params: {
        scope: "openid offline_access",
      }
    }
  });

  local: Storage = new Storage(LocalStorage);
  refreshSubscription: any;
  user: Object;
  zoneImpl: NgZone;

  constructor(private http: Http, zone: NgZone) {

    this.zoneImpl = zone;
    // Check if there is a profile saved in local storage
    this.local.get("profile").then(profile => {
      this.user = JSON.parse(profile);
    }).catch(error => {
      console.log(error);
    });

    this.lock.on("authenticated", authResult => {

      this.local.set("id_token", authResult.idToken);

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        profile.user_metadata = profile.user_metadata || {};
        this.local.set("profile", JSON.stringify(profile));
        this.user = profile;

        // get the auth0 access token, so we can get the IDP access token for
        // direct calls to the IDP API
        let postData = JSON.stringify({
          "client_id": Config.Auth0.CLIENT_ID,
          "client_secret": Config.Auth0.CLIENT_SECRET,
          "audience": "https://" + Config.Auth0.DOMAIN + "/api/v2/",
          "grant_type": "client_credentials"
        });

        let postHeaders = new Headers({
          "Content-Type": "application/json"
        });

        let postOptions = new RequestOptions({ headers: postHeaders });

        this.http.post("https://" + Config.Auth0.DOMAIN + "/oauth/token", postData, postOptions)
          .toPromise()
          .then((postResponse) => {
            // got Auth0 access token.
            if (postResponse.status !== 200) {
              console.log("Error: failed to get Auth0 access token: \n" + postResponse.text());
              return;
            }
            else {
              // extract and save auth0 access toen
              var auth0_access_token: string = JSON.parse(postResponse.text()).access_token;
              this.local.set("auth0_access_token", auth0_access_token);

              // next, query the user profile to get the IDP access token
              let getHeaders = new Headers({
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth0_access_token
              });

              let getOptions = new RequestOptions({ headers: getHeaders });
              this.http.get("https://" + Config.Auth0.DOMAIN + "/api/v2/users/" + profile.user_id, getOptions)
                .toPromise()
                .then((getResponse) => {
                  // extract and save github access token
                  var github_access_token: string = JSON.parse(getResponse.text()).identities[0].access_token;
                  this.local.set("github_access_token", github_access_token);

                  // done, hide the sign-in UX
                  this.lock.hide();
                }).catch((error) => {
                  // Handle error
                  alert(error);
                  return;
                });
            }
          }).catch((error) => {
            // Handle error
            alert(error);
            return;
          });
      });

      this.local.set("refresh_token", authResult.refreshToken);
      this.zoneImpl.run(() => this.user = authResult.profile);
    });

  }

  public authenticated() {
    // Check if there's an unexpired JWT
    return tokenNotExpired();
  }

  public login() {
    // Show the Auth0 Lock widget
    this.lock.show();
  }

  public logout() {
    this.local.remove("profile");
    this.local.remove("id_token");
    this.local.remove("refresh_token");
    this.local.remove("auth0_access_token");
    this.local.remove("github_access_token");

    this.zoneImpl.run(() => this.user = null);
  }
}