import {Page, NavController} from "ionic-angular";
import {PluginTestPage} from "../pluginTest/pluginTest";
import {SchemasPage} from "../browser/schemasPage/schemasPage";
import {OnboardingMethodsPage} from "../browser/onboardingMethodsPage/onboardingMethodsPage";
import {VoiceHandlersPage} from "../browser/voiceHandlersPage/voiceHandlersPage";
import {GitHubUser} from "../../model/gitHub/gitHubUser";
import {AuthService} from '../../providers/authService';

@Page({
    templateUrl: "build/pages/settingsPage/settingsPage.html"
})
export class SettingsPage {

    // page navigations
    private pluginTestPage = PluginTestPage;
    private schemasPage = SchemasPage;
    private onboardingMethodsPage = OnboardingMethodsPage
    private voiceHandlersPage = VoiceHandlersPage;

    // ctor
    constructor(private nav: NavController, private authService: AuthService) {
    }
}
