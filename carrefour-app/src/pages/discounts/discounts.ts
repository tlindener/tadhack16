import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';
import {GlobalService} from "../../providers/global-service";

@Component({
  selector: 'page-discounts',
  templateUrl: 'discounts.html'
})
export class Discounts {

  public discountGroups = [];

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

  constructor(public navCtrl: NavController, public app: GlobalService) {

    for(var i = 0; i < this.app.promotions.length; i++){
      var promotions = this.app.promotions;
      var id = promotions[i].id;
      this.discountGroups.push({
        id: id,
        name: promotions[i].discountedItem.name,
        color: this.app.getCategoryColor(id),
        count: this.app.countItemsInCat(id)
      });
    }
  }

  getColor(item) {
    return item.color;
  }

  public countMissingItemsCat(id){
    return this.app.countMissingItemsCat(id);
  }

}
