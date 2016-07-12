import {Page, App, NavParams} from "ionic-angular";
import {OnInit} from "@angular/core";
import {OnboardingPageBase} from "../onboardingPageBase";

import {SearchDataService} from "../../../providers/searchDataService";
import {OpenT2TBridgeService} from "../../../providers/opent2tBridgeService";

import {Device} from "../../../model/device";

import {ZWaveDeviceWatcherService} from "../../../providers/zwaveDeviceWatcherService";
import {ZWaveDeviceItem} from "../../../model/zwaveDeviceItem";

import {doAlert} from "../../../model/utils";

@Page({
    templateUrl: "build/pages/onboarding/zwaveOnboardingPage/zwaveOnboardingPage.html",
    providers: [ZWaveDeviceWatcherService]
})
export class ZWaveOnboardingPage extends OnboardingPageBase implements OnInit {

    private items: ZWaveDeviceItem[];
    private manufacturerNameFilter: string = null;
    private manufacturerNameRegEx: RegExp = null;

    // ctor
    constructor(
        app: App,
        opent2tBridgeService: OpenT2TBridgeService,
        searchDataService: SearchDataService,
        navParams: NavParams,
        private zwaveDeviceWatcherService: ZWaveDeviceWatcherService) {

        // initialize base class
        super(app, opent2tBridgeService, searchDataService, navParams);

        // initialize additional state for this onboarding page
        this.manufacturerNameFilter = this.navParams.get("manufacturerNameFilter");
        this.manufacturerNameRegEx = new RegExp(this.manufacturerNameFilter);
    }

    // event handler for page init
    ngOnInit() {
        super.ngOnInit();
        this.zwaveDeviceWatcherService.start(this.scanCallback.bind(this), this.handleCordovaError.bind(this));
    }

    // callback to get the zwave devices.
    scanCallback(result: Array<any>) {

        console.log("Found ZWave devices (all): " + JSON.stringify(result));

        // filter nodes to those that have the expected manufacturer name
        this.items = result.filter((node: any) => this.manufacturerNameRegEx.test(node.manufacturer));

        console.log("Found ZWave devices (filtered): " + JSON.stringify(this.items));
    }

    // callback to handle cordova errors.
    handleCordovaError(err) {
        console.log(err);
        doAlert(err);
    }

    // initiates a device connection
    connect(item: ZWaveDeviceItem) {

        let device = new Device();
        device.name = item.name;
        device.props = JSON.stringify({
            id: item.productid
        });

        super.onboard(device);
    }
}