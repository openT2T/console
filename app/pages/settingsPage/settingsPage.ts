import {Page, NavController} from "ionic-angular";
import {PluginTestPage} from "../pluginTest/pluginTest";
import {SchemasPage} from "../browser/schemasPage/schemasPage";
import {OnboardingMethodsPage} from "../browser/onboardingMethodsPage/onboardingMethodsPage";
import {VoiceHandlersPage} from "../browser/voiceHandlersPage/voiceHandlersPage";
import {GitHubUser} from "../../model/gitHub/gitHubUser";

@Page({
    templateUrl: "build/pages/settingsPage/settingsPage.html"
})
export class SettingsPage {

    // ctor
    constructor(private nav: NavController) {
    }

    // navigates to the plugin test page
    pluginTest() {
        this.nav.push(PluginTestPage);
    }

    // navigates to the schema browser
    browseSchemas() {
        this.nav.push(SchemasPage);
    }

    // navigates to the onboarding method browser
    browseOnboardingMethods() {
        this.nav.push(OnboardingMethodsPage);
    }

    // navigates to the voice handler browser
    browseVoiceHandlers() {
        this.nav.push(VoiceHandlersPage);
    }
}
