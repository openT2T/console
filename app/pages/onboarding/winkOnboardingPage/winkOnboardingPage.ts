import {Page, App, Nav, NavParams} from "ionic-angular";
import {OnInit} from "@angular/core";
import {OnboardingPageBase} from "../onboardingPageBase";

import {SearchDataService} from "../../../providers/searchDataService";
import {OpenT2TBridgeService} from "../../../providers/opent2tBridgeService";

import {Device} from "../../../model/device";

import {WinkConfig} from "./winkConfig";
import {WinkUser} from "./model/winkUser";
import {WinkService} from "./winkService";
import {WinkDevice} from "./model/winkDevice";

import {doAlert} from "../../../model/utils";

@Page({
    templateUrl: "build/pages/onboarding/winkOnboardingPage/winkOnboardingPage.html",
    providers: [WinkService]
})
export class WinkOnboardingPage extends OnboardingPageBase implements OnInit {

    // init form data
    private credentials: { email?: string, password?: string } = {};
    private error: string = null;
    private submitted: boolean = false;
    private idKeyFilter: string = null;

    // ctor
    constructor(
        app: App,
        opent2tBridgeService: OpenT2TBridgeService,
        searchDataService: SearchDataService,
        nav: Nav,
        navParams: NavParams,
        public winkService: WinkService) {

        // initialize base class
        super(app, opent2tBridgeService, searchDataService, nav, navParams);

        // initialize additional state for this onboarding page
        this.idKeyFilter = this.navParams.get("idKeyFilter");
    }

    // event handler for page init
    ngOnInit() {
        super.ngOnInit();
    }

    // event handler for form submission
    submit(form) {
        this.submitted = true;
        this.error = null;
        if (form.valid) {
            this.winkService.initiateSignIn(this.credentials.email, this.credentials.password)
                .then((signedInUser) => {
                    // the UI is bound to the winkService user property so nothing to do here.

                    this.winkService.initiateEnumerateDevices(this.idKeyFilter)
                        .then((devices) => {
                            // the UI is bound to the winkService devices property so nothing to do here.
                        });
                }).catch((err) => {
                    // there was an error. display it on screen.
                    this.error = JSON.parse(JSON.stringify(err)).error_description;
                });
        }
    }

    // shows an doAlert.
    showAlert(message) {
        doAlert(message);
    }

    // initiates a device connection
    connect(item: WinkDevice) {

        let device = new Device();
        device.name = item.name;
        device.props = JSON.stringify({
            id: item[this.idKeyFilter],
            access_token: this.winkService.user.access_token
        });

        super.onboard(device);
    }
}