import {Page, NavController, NavParams} from "ionic-angular";
import {OnInit} from "angular2/core";
import {VoiceHandlersDataService} from "../../../providers/voiceHandlersDataService";
import {VoiceHandlerFileContentPage} from "../voiceHandlerFileContentPage/voiceHandlerFileContentPage";
import {doAlert} from "../../../model/utils";

@Page({
  templateUrl: "build/pages/browser/voiceHandlerPage/voiceHandlerPage.html"
})
export class VoiceHandlerPage implements OnInit {

  // files in the repository
  files: string[] = null;
  type: string = null;
  name: string = null;

  // ctor 
  constructor(private nav: NavController,
              private navParams: NavParams,
              private voiceHandlersDataService: VoiceHandlersDataService) {
    this.type = navParams.get("type");
    this.name = navParams.get("name");
  }

  // handles page init.
  ngOnInit() {
    this.voiceHandlersDataService.initiateGetVoiceHandlersFiles(this.type, this.name)
            .then((files) => {
                this.files = files;
            }).catch((err) => {
                // there was an error. display it on screen.
                console.log(err.text());
                doAlert(err.text());
            });
  }

  browseFile(f: string) {
    let path = this.type + "/" + this.name + "/" + f;
    this.nav.push(VoiceHandlerFileContentPage, {path: path, name: f});
  }

}