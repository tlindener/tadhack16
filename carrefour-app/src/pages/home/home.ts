import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items = [
    { id : 1, name: "Tomas" },
    { id : 2, name: "Jeroen" },
    { id : 3, name: "Ryan" },
    { id : 4, name: "Tomas" },
    { id : 5, name: "Jeroen" },
    { id : 6, name: "Ryan" },
    { id : 7, name: "Tomas" },
    { id : 8, name: "Jeroen" },
    { id : 9, name: "Ryan" }
  ];

  public suggestedItems = [
    { id : 1, name: "Tomas" },
    { id : 2, name: "Jeroen" },
    { id : 3, name: "Ryan" }
  ];

  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {
  }

  share(slidingItem: ItemSliding) {
    slidingItem.close();
  }

  add() {
    this.items.push({ id : 4, name: "Heya" });
  }

 openMenu() {
   this.menuCtrl.open();
 }

 closeMenu() {
   this.menuCtrl.close();
 }

 toggleMenu() {
   this.menuCtrl.toggle();
 }

}
