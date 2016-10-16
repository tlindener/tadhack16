import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';

@Component({
  selector: 'page-discounts',
  templateUrl: 'discounts.html'
})
export class Discounts {

  public discountGroups = [
    { id : 1, name: "50% discount on green items", discount: 15, color: "#d2ffb1", count: 3 },
    { id : 2, name: "Get FREE Snickers!", discount: 10, color: "#EAD9FF", count: 4 }
  ];

  public discountItems = [
    { id : 1, name: "CERVEZA MAHOU CLAS", discount: 15 },
    { id : 2, name: "KETCHUP 50%MENO AZUC", discount: 29 },
    { id : 3, name: "MACARRONES CARREFOUR", discount: 10 },
    { id : 4, name: "PECHUGA PAVO ELPOZO", discount: 15 },
    { id : 5, name: "PAN BIMBO CORTEZA", discount: 5 },
    { id : 6, name: "TINTE OLIA 9.3GOLDEN", discount: 25 },
    { id : 7, name: "COCA COLA BI-PACK", discount: 15 },
    { id : 8, name: "LECHE SEMI. PRESID", discount: 15 }
  ];
  
  constructor(public navCtrl: NavController) {
  }

  getColor(item) {
    return item.color;
  }

}