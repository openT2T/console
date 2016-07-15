import {Page, App, Nav, NavParams} from "ionic-angular";
import {OnInit} from "@angular/core";
import {OnboardingPageBase} from "../onboardingPageBase";
import {SearchDataService} from "../../../providers/searchDataService";
import {OpenT2TBridgeService} from "../../../providers/opent2tBridgeService";
import {Device} from "../../../model/device";
import {BleDeviceWatcherService} from "../../../providers/bleDeviceWatcherService";
import {BleDeviceItem} from "../../../model/bleDeviceItem";
import {doAlert} from "../../../model/utils";

@Page({
    templateUrl: "build/pages/onboarding/bluetoothOnboardingPage/bluetoothOnboardingPage.html",
    providers: [BleDeviceWatcherService]
})
export class BluetoothOnboardingPage extends OnboardingPageBase implements OnInit {

    public items: BleDeviceItem[];
    private advertisementLocalNameFilter: string = null;
    private advertisementLocalNameRegEx: RegExp = null;

    // ctor
    constructor(
        app: App,
        opent2tBridgeService: OpenT2TBridgeService,
        searchDataService: SearchDataService,
        nav: Nav,
        navParams: NavParams,
        private bleDeviceWatcherService: BleDeviceWatcherService) {

        // initialize base class
        super(app, opent2tBridgeService, searchDataService, nav, navParams);

        // initialize additional state for this onboarding page
        this.advertisementLocalNameFilter = this.navParams.get("advertisementLocalNameFilter");
        this.advertisementLocalNameRegEx = new RegExp(this.advertisementLocalNameFilter);
    }

    // event handler for page init
    ngOnInit() {
        super.ngOnInit();
        
        // start the bluetooth watcher
        this.bleDeviceWatcherService.start()
            .then(() => {
                this.items = this.bleDeviceWatcherService.devices;
            }).catch((errorMessage) => {
                // there was an error.
                console.log(errorMessage);
                doAlert(errorMessage);
            });
    }


    // initiates a device connection
    connect(item: BleDeviceItem) {

        let device = new Device();
        device.name = item.name;
        device.props = JSON.stringify({
            id: item.id
        });

        super.onboard(device);
    }
}