import {Page, NavController} from "ionic-angular";
import {OnInit} from "angular2/core";
import {OnboardingDataService} from "../../../providers/onboardingDataService";
import {OnboardingMethodPage} from "../onboardingMethodPage/onboardingMethodPage";
import {doAlert} from "../../../model/utils";

@Page({
    templateUrl: "build/pages/browser/onboardingMethodsPage/onboardingMethodsPage.html"
})
export class OnboardingMethodsPage implements OnInit {

    // onboarding methods in the repository.
    onboardingMethods: string[] = null;
    error: string = null;

    // ctor
    constructor(private onboardingDataService: OnboardingDataService,
                private nav: NavController) {
    }

    // handles page init.
    ngOnInit() {
        this.onboardingDataService.initiateGetOnboardingMethodsList()
            .then((methods) => {
                this.onboardingMethods = methods;
            }).catch((err) => {
                // there was an error. display it on screen.
                console.log(err.text());
                doAlert(err.text());
            });
    }

    browseOnboardingMethod(method: string) {
      this.nav.push(OnboardingMethodPage, {name: method});
    }
}
