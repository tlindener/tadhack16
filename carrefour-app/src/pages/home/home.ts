import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public myItems = [
    { id : 1, name: "Tomas", price: 4.99 },
    { id : 2, name: "Jeroen", price: 4.99 },
    { id : 3, name: "Ryan", price: 13.99 },
    { id : 4, name: "Tomas", price: 4.99 },
    { id : 5, name: "Jeroen", price: 34.99 },
    { id : 6, name: "Ryan", price: 4.99 },
    { id : 7, name: "Tomas", price: 4.99 },
    { id : 8, name: "Jeroen", price: 4.99 },
    { id : 9, name: "Ryan", price: 4.99 }
  ];

  public suggestedItems = [
    { id : 1, name: "Tomas", price: 5.34 },
    { id : 2, name: "Jeroen", price: 23.99 },
    { id : 3, name: "Ryan", price: 2.79 }
  ];

  public removedItems = [];

  constructor(public navCtrl: NavController) {
  }

  share(slidingItem: ItemSliding) {
    slidingItem.close();
  }

  add(item) {
    this.myItems.push(item);
    for (var i=0; i < this.suggestedItems.length; i++) {
      if (this.suggestedItems[i].id === item.id) {
        this.suggestedItems.splice(i,1);
      }
    }
  }

  remove(item) {
    this.suggestedItems.push(item);
    for (var i=0; i < this.myItems.length; i++) {
      if (this.myItems[i].id === item.id) {
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
    return Math.round(price*100)/100;
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