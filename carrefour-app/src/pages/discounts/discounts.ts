import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';

@Component({
  selector: 'page-discounts',
  templateUrl: 'discounts.html'
})
export class Discounts {

  public discountGroups = [
    { id : 1, name: "50% discount on these items", discount: 15, color: "#69D2E7", count: 3 },
    { id : 2, name: "Jeroen", discount: 29, color: "#029DAF", count: 4 },
    { id : 3, name: "Get FREE Snickers!", discount: 10, color: "#ffef95", count: 5 },
    { id : 4, name: "Tomas", discount: 15, color: "#E32551", count: 3 }
  ];

  public discountItems = [
    { id : 1, name: "Tomas", discount: 15 },
    { id : 2, name: "Jeroen", discount: 29 },
    { id : 3, name: "Ryan", discount: 10 },
    { id : 4, name: "Tomas", discount: 15 },
    { id : 5, name: "Jeroen", discount: 5 },
    { id : 6, name: "Ryan", discount: 25 },
    { id : 7, name: "Tomas", discount: 15 },
    { id : 8, name: "Jeroen", discount: 15 },
    { id : 9, name: "Ryan", discount: 15 }
  ];

  constructor(public navCtrl: NavController) {
  }

  getColor(item) {
    return item.color;
  }

}