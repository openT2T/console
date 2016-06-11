import {Page, NavController, NavParams} from "ionic-angular";
import {OnInit} from "angular2/core";
import {TranslatorsDataService} from "../../../providers/translatorsDataService";
import {ThingsListPage} from "../thingsListPage/thingsListPage";
import {doAlert} from "../../../model/utils";

@Page({
    templateUrl: "build/pages/browser/schemasPage/schemasPage.html"
})
export class SchemasPage implements OnInit {

    // schemas in the repository.
    schemas: string[] = null;
    error: string = null;

    // ctor
    constructor(private nav: NavController,
                private navParams: NavParams,
                private translatorsDataService: TranslatorsDataService) {
    }

    // handles page init.
    ngOnInit() {
        this.translatorsDataService.initiateGetSchemasList()
            .then((schemas) => {
                this.schemas = schemas;
            }).catch((err) => {
                // there was an error. display it on screen.
                console.log(err.text());
                doAlert(err.text());
            });
    }

    browseTranslators(schema: string) {
      this.nav.push(ThingsListPage, {schema: schema});
    }
}
