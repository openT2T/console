import {Page, NavController, NavParams} from "ionic-angular";
import {OnInit} from "angular2/core";
import {VoiceHandlersDataService} from "../../../providers/voiceHandlersDataService";
import {VoiceHandlerPage} from "../voiceHandlerPage/voiceHandlerPage";
import {doAlert} from "../../../model/utils";

@Page({
  templateUrl: "build/pages/browser/voiceHandlerListPage/voiceHandlerListPage.html"
})
export class VoiceHandlerListPage implements OnInit {

  // handlers in the repository
  handlers: string[] = null;
  type: string = null;

  // ctor 
  constructor(private nav: NavController,
              private navParams: NavParams,
              private voiceHandlersDataService: VoiceHandlersDataService) {
    this.type = navParams.get("type");
  }

  // handles page init.
  ngOnInit() {
    console.log("type: " + this.type);
    this.voiceHandlersDataService.initiateGetVoiceHandlersList(this.type)
            .then((handlers) => {
                this.handlers = handlers;
            }).catch((err) => {
                // there was an error. display it on screen.
                console.log(err.text());
                doAlert(err.text());
            });
  }

  browseHandler(h: string) {
    this.nav.push(VoiceHandlerPage, {type: this.type, name: h});
  }

}