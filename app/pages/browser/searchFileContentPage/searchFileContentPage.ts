import {Page, NavParams} from "ionic-angular";
import {OnInit} from "angular2/core";
import {SearchDataService} from "../../../providers/searchDataService";
import {doAlert} from "../../../model/utils";

// NOTE: this is just a test page for showing the content of a file returned by the search API; to be removed
@Page({
  templateUrl: "build/pages/browser/searchFileContentPage/searchFileContentPage.html"
})
export class SearchFileContentPage implements OnInit {
  name: string;
  path: string;
  content: string;

  constructor(private navParams: NavParams,
              private searchDataService: SearchDataService) {
    this.name = navParams.get("name");
    this.path = navParams.get("path");
  }

  ngOnInit() {
    this.searchDataService.initiateGetFileContent(this.path)
            .then((content) => {
                this.content = content;  // things include the schema file name as well
            }).catch((err) => {
                // there was an error. display it on screen.
                console.log(err.text());
                doAlert(err.text());
            });
  }

}