import {Page, NavController} from "ionic-angular";
import {OnInit} from "angular2/core";
import {VoiceHandlersDataService} from "../../../providers/voiceHandlersDataService";
import {VoiceHandlerListPage} from "../voiceHandlerListPage/voiceHandlerListPage";
import {doAlert} from "../../../model/utils";

@Page({
    templateUrl: "build/pages/browser/voiceHandlersPage/voiceHandlersPage.html"
})
export class VoiceHandlersPage implements OnInit {

    // schemas in the repository.
    voiceHandlers: string[] = null;
    error: string = null;

    // ctor
    constructor(private voiceHandlersDataService: VoiceHandlersDataService,
                private nav: NavController) {
    }

    // handles page init.
    ngOnInit() {
        this.voiceHandlersDataService.initiateGetSchemasList()
            .then((voiceHandlers) => {
                this.voiceHandlers = voiceHandlers;
            }).catch((err) => {
                // there was an error. display it on screen.
                console.log(err.text());
                doAlert(err.text());
            });
    }

    browseVoiceHandler(voiceHandler: string) {
      this.nav.push(VoiceHandlerListPage, {type: voiceHandler});
    }
}
