import {Page} from "ionic-angular";
import {TranslatorsPage} from "../translatorsPage/translatorsPage";
import {SettingsPage} from "../settingsPage/settingsPage";


@Page({
  templateUrl: "build/pages/tabs/tabs.html"
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab"s root Page
  translatorsRoot: any = TranslatorsPage;
  settingsRoot: any = SettingsPage;
}
