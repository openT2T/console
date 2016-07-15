import {Page, App, NavParams, Nav} from "ionic-angular";
import {ViewChild, OnInit} from "@angular/core";

import {ThingFiles} from "../../model/thingFiles";
import {Device} from "../../model/device";

import {TranslatorsPage} from "../../pages/translatorsPage/translatorsPage";
import {SearchDataService} from "../../providers/searchDataService";
import {OpenT2TBridgeService} from "../../providers/opent2tBridgeService";

// base page for onboarding.
export abstract class OnboardingPageBase implements OnInit {

    // paths of the files for translator being onboarded.
    protected files: ThingFiles;

    // contents of the files for translator being onboarded.
    manifest: string = null;
    jsTranslator: string = null;
    schema: string = null;

    // constructor
    constructor(
        private app: App,
        private opent2tBridgeService: OpenT2TBridgeService,
        private searchDataService: SearchDataService,
        protected nav: Nav,
        protected navParams: NavParams) {

        this.files = this.navParams.get("files");
    }

    // event handler for page init
    ngOnInit() {
        // get the mainifest file content
        this.searchDataService.initiateGetFileContent(this.files.manifest)
            .then((data) => {
                this.manifest = data;
            }).catch((errorMessage) => {
                console.log(errorMessage);
                alert(errorMessage);
            });

        // get the js translator file content
        this.searchDataService.initiateGetFileContent(this.files.deviceTranslator)
            .then((data) => {
                this.jsTranslator = data;
            }).catch((errorMessage) => {
                console.log(errorMessage);
                alert(errorMessage);
            });

        // get the schema file content
        this.searchDataService.initiateGetFileContent(this.files.schema)
            .then((data) => {
                this.schema = data;
            }).catch((errorMessage) => {
                console.log(errorMessage);
                alert(errorMessage);
            });
    }

    // initiates onboarding for a translator
    onboard(device: Device) {
        this.opent2tBridgeService.addDevice(this.schema, this.jsTranslator, device);

        // onboarding complete. Go to home page.
        // TODO: do this on success.
        this.nav.setRoot(TranslatorsPage);
    }
}