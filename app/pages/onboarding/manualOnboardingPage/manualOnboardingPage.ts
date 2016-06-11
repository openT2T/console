import {Page, IonicApp, NavParams} from "ionic-angular";
import {OnInit} from "angular2/core";
import {OnboardingPageBase} from "../onboardingPageBase";

import {SearchDataService} from "../../../providers/searchDataService";
import {OpenT2TBridgeService} from "../../../providers/opent2tBridgeService";

import {Device} from "../../../model/device";

@Page({
    templateUrl: "build/pages/onboarding/manualOnboardingPage/manualOnboardingPage.html"
})
export class ManualOnboardingPage extends OnboardingPageBase implements OnInit {

    // init form data
    private credentials: { token?: string } = {};
    private error: string = null;
    private submitted: boolean = false;
    private instructionsUrl: string = null;
    private deviceName: string = null;

    // ctor
    constructor(
        app: IonicApp,
        opent2tBridgeService: OpenT2TBridgeService,
        searchDataService: SearchDataService,
        navParams: NavParams) {

        // initialize base class
        super(app, opent2tBridgeService, searchDataService, navParams);

        // initialize additional state for this onboarding page
        this.instructionsUrl = this.navParams.get("instructionsUrl");
        this.deviceName = this.navParams.get("name");
    }

    // event handler for form submission
    submit(form) {
        this.submitted = true;
        this.error = null;
        if (form.valid) {
            // initiate connection if the form is valid
            this.connect(this.deviceName, this.credentials.token);
        }
    }

    // initiates a device connection
    connect(name, token) {

        let device = new Device();
        device.name = name;
        device.props = JSON.stringify({
            token: token
        });

        super.onboard(device);
    }
}
