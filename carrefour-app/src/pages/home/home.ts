import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items = [
    { id : 1, name: "Tomas" },
    { id : 2, name: "Jeroen" },
    { id : 3, name: "Ryan" }
  ];

  constructor(public navCtrl: NavController) {
  }

  share(slidingItem: ItemSliding) {
    slidingItem.close();
  }

}
