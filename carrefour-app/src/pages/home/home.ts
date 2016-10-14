import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public myItems = [
    { id : 1, name: "Tomas", price: 10 }
  ];

  public suggestedItems = [
    { id : 2, name: "Jeroen", price: 20 },
    { id : 3, name: "Ryan", price: 5 }
  ]

  public removedItems = [];

  constructor(public navCtrl: NavController) {
  }

  share(slidingItem: ItemSliding) {
    slidingItem.close();
  }

  add(item) {
    this.myItems.push(item);
    for (var i=0; i < this.suggestedItems.length; i++) {
      if (this.suggestedItems[i].name === item.name) {
        this.suggestedItems.splice(i,1);
      }
    }
  }

  remove(item) {
    this.suggestedItems.push(item);
    for (var i=0; i < this.myItems.length; i++) {
      if (this.myItems[i].name === item.name) {
        this.removedItems.push(this.myItems[i]);
        this.myItems.splice(i,1);
      }
    }
  }

  totalCartPrice() {
    var price: number = 0;
    for (var i=0; i < this.myItems.length; i++) {
      price += this.myItems[i].price;
    }
    return price;
  }

  myItemsLength() {
    return this.myItems.length;
  }

  plural(word, int) {
    var plural: string = '';
    if (int % 10 != 1) {
      plural = 's';
    }
    return word + plural;
  }

}
