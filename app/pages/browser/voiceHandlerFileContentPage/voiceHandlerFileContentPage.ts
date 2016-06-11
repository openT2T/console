import {Page, NavParams} from "ionic-angular";
import {OnInit} from "angular2/core";
import {VoiceHandlersDataService} from "../../../providers/voiceHandlersDataService";
import {doAlert} from "../../../model/utils";

@Page({
  templateUrl: "build/pages/browser/fileContentPage/fileContentPage.html"
})
export class VoiceHandlerFileContentPage implements OnInit {
  name: string;
  path: string;
  content: string;

  constructor(private navParams: NavParams,
              private voiceHandlersDataService: VoiceHandlersDataService) {
    this.name = navParams.get("name");
    this.path = navParams.get("path");
  }

  ngOnInit() {
    this.voiceHandlersDataService.initiateGetVoiceHandlersFileContent(this.path)
            .then((content) => {
                this.content = content;  // things include the schema file name as well
            }).catch((err) => {
                // there was an error. display it on screen.
                console.log(err.text());
                doAlert(err.text());
            });
  }

}