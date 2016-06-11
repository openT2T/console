import {Page, NavController, NavParams} from "ionic-angular";
import {OnInit} from "angular2/core";
import {OnboardingDataService} from "../../../providers/onboardingDataService";
import {OnboardingFileContentPage} from "../onboardingFileContentPage/onboardingFileContentPage";
import {OnboardingMethodNodePage} from "../onboardingMethodNodePage/onboardingMethodNodePage";
import {doAlert} from "../../../model/utils";

@Page({
  templateUrl: "build/pages/browser/onboardingMethodPage/onboardingMethodPage.html"
})
export class OnboardingMethodPage implements OnInit {

  // directories and files in the repository
  items: string[] = null;
  name: string = null;

  // ctor 
  constructor(private nav: NavController,
              private navParams: NavParams,
              private onboardingDataService: OnboardingDataService) {
    this.name = navParams.get("name");
  }

  // handles page init.
  ngOnInit() {
    this.onboardingDataService.initiateGetOnboardingMethod(this.name)
            .then((files) => {
                this.items = files;
            }).catch((err) => {
                // there was an error. display it on screen.
                console.log(err.text());
                doAlert(err.text());
            });
  }

  browseItem(item: string) {
    if (item.endsWith(".xml")) // it"s the XML file
      this.nav.push(OnboardingFileContentPage, {path: this.name + "/" + item, name: item});
    else
      this.nav.push(OnboardingMethodNodePage, {method: this.name, name: item});
  }

}