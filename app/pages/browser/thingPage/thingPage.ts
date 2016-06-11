import {Page, NavController, NavParams} from "ionic-angular";
import {OnInit} from "angular2/core";
import {TranslatorsDataService} from "../../../providers/translatorsDataService";
import {FileContentPage} from "../fileContentPage/fileContentPage";
import {SearchDataService} from "../../../providers/searchDataService";
import {SearchFileContentPage} from "../searchFileContentPage/searchFileContentPage";
import {doAlert} from "../../../model/utils";

@Page({
  templateUrl: "build/pages/browser/thingPage/thingPage.html"
})
export class ThingPage implements OnInit {

  // files in the repository
  files: string[] = null;
  schema: string = null;
  name: string = null;

  searchResults: string[] = null; // files returned using the search API

  // ctor 
  constructor(private nav: NavController,
              private navParams: NavParams,
              private translatorsDataService: TranslatorsDataService,
              private searchDataService: SearchDataService) {
    this.schema = navParams.get("schema");
    this.name = navParams.get("name");
  }

  // handles page init.
  ngOnInit() {
    this.translatorsDataService.initiateGetThingFiles(this.schema, this.name)
            .then((files) => {
                this.files = files;
            }).catch((err) => {
                // there was an error. display it on screen.
                console.log(err.text());
                doAlert(err.text());
            });

    this.searchDataService.initiateGetFilesListBySearch(this.name)
            .then((files) => {
                this.searchResults = files.toList();
             }).catch((err) => {
                console.log(err.text());
                doAlert(err.text());
            });
  }

  browseFile(f: string) {
    let path = this.schema + "/" + this.name + "/js/" + f;
    this.nav.push(FileContentPage, {path: path, name: f});
  }

  browseSearchedFile(f: string) {
    this.nav.push(SearchFileContentPage, {path: f, name: f});
  }

}