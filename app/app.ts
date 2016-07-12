import {Component} from '@angular/core';
import {ionicBootstrap, Platform} from "ionic-angular";
import {Http, HTTP_PROVIDERS} from "@angular/http";

import {GenericGitHubDataService} from "./providers/genericGitHubDataService";
import {TranslatorsDataService} from "./providers/translatorsDataService";
import {VoiceHandlersDataService} from "./providers/voiceHandlersDataService";
import {OnboardingDataService} from "./providers/onboardingDataService";
import {SearchDataService} from "./providers/searchDataService";
import {OpenT2TBridgeService} from "./providers/opent2tBridgeService";

import {TabsPage} from "./pages/tabs/tabs";

// https://angular.io/docs/ts/latest/api/core/Type-interface.html
import {Type} from "@angular/core";

@Component({
    templateUrl: "build/app.html"
})
export class MyApp {
    rootPage: Type = TabsPage;

    constructor(platform: Platform) {
        platform.ready().then(() => {
            // The platform is now ready. Note: if this callback fails to fire, follow
            // the Troubleshooting guide for a number of possible solutions:
            //
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //
            // First, let"s hide the keyboard accessory bar (only works natively) since
            // that"s a better default:
            //
            // Keyboard.setAccessoryBarVisible(false);
            //
            // For example, we might change the StatusBar color. This one below is
            // good for dark backgrounds and light text:
            // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)
        });
    }
}

// Pass the main app component as the first argument
// Pass any providers for your app in the second argument
// Set any config for your app as the third argument:
// http://ionicframework.com/docs/v2/api/config/Config/

ionicBootstrap(MyApp, [OpenT2TBridgeService, GenericGitHubDataService, TranslatorsDataService, VoiceHandlersDataService, SearchDataService, OnboardingDataService], {
    backButtonText: 'Go Back',
    iconMode: 'ios',
    modalEnter: 'modal-slide-in',
    modalLeave: 'modal-slide-out',
    tabbarPlacement: 'bottom',
    pageTransition: 'ios',
    tabSubPages: false
});