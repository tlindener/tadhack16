import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { Discounts } from '../pages/discounts/discounts';
import { Settings } from '../pages/settings/settings';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Shopping list', component: HomePage, icon: "ios-cart-outline" },
      { title: 'Discounts', component: Discounts, icon: "ios-pricetags-outline" },
      { title: 'Settings', component: Settings, icon: "ios-settings" }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
