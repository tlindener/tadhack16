import { Component } from '@angular/core';

import { NavController, ToastController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';
import {GlobalService} from "../../providers/global-service";

Array.prototype.diff = function(a) {
  return this.filter(function(i) {return a.indexOf(i) < 0;});
};

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public app: GlobalService) {
    this.recalculate();
  }

  // DEFINITIONS

  public myItems = this.app.myItems;
  public suggestedItems = this.app.suggestedItems;

  // FUNCTIONS
  recalculate() {

    // --------- myList generation
    // Adding discounted items
    var discounts = this.getFulfilledDiscountInfo(this.myItems);
    for (var i=0; i < discounts.length; i++) {
      if (!this.app.subsetOf([discounts[i].discountedItem.name], this.app.namesArrayFromObjList(this.myItems))){
        this.myItems.push(discounts[i].discountedItem);
      }
    }
    // Removing discounted items
    for(var i=0; i < this.myItems.length; i++) {
      if (this.myItems[i].discounted == 1) {
        if (!this.isLegalDiscount(this.myItems[i], discounts)) {
           this.myItems.splice(i,1);
        }
      }
    }

    // --------- Suggested items generation from missing for discount items
    var missing = this.app.getMissingItems(this.myItems);
    for (var i = 0; i < missing.length; i++) {
      if (missing[i].items.length > 0) {
        for (var k = 0; k < 1; k++) {
          if (!this.app.subsetOf([missing[i].items[k]], this.app.namesArrayFromObjList(this.suggestedItems))){

            var id = Math.round(Math.random()*100) + 1;
            this.suggestedItems.push({
              id: id,
              name: missing[i].items[k],
              discounted: 0
            });
          }
        }
      }
    }
  }

  public countSuggestedItemsInCat(id){
    var count;
    for (var i = 0; i < this.app.promotions.length; i++) {
      if (this.app.promotions[i].id == id) {
        for(var k = 0; k < this.suggestedItems.length; k++){

        }
      }
    }
  }

  public getCategory(id) {
    for(var k=0; k < this.promotions.length; k++) {
      if (this.promotions[k].id == id){
        return this.promotions[k];
      }
    }
    return null;
  }

  public getCount(obje) {
    return obje ? obje.count : null;
  }

  public isLegalDiscount(item, discounts){
    for(var k=0; k < discounts.length; k++) {
      if (item.name == discounts[k].discountedItem.name){
        return true;
      }
    }
    return false;
  }

  public hasCat(item){
    return (this.app.countItemsInCat(this.getItemDiscountCategories(item)) > 0) && !item.discounted;
  }
  // Given an item object, fins to which discount categories it belongs to
  public getItemDiscountCategories(item) {
    var ids = [];
    for (var i = 0; i < this.app.promotions.length; i++) {
      var items = this.app.promotions[i].items;
      for (var k = 0; k < items.length; k++) {
        if (item.name == items[k]) {
          ids.push(this.app.promotions[i].id);
        }
      }
      if (item.name == this.app.promotions[i].discountedItem.name) {
        ids.push(this.app.promotions[i].id);
      }
    }
    return ids[0] ? ids[0] : null;
  }

  public getFulfilledDiscountInfo(itemList){
    var discounts = [];
    for (var i=0; i < this.app.promotions.length; i++) {
      var categoryItems = this.app.promotions[i].items;
      var itemNames = this.app.namesArrayFromObjList(itemList);
      if (this.app.subsetOf(categoryItems, itemNames)){
        discounts.push(this.app.promotions[i]);
      }
    }
    return discounts;
  }

  public presentToast(item) {
    let toast = this.toastCtrl.create({
      message: 'Item deleted',
      showCloseButton: true,
      closeButtonText: 'Undo',
      duration: 3000
    });
    toast.present();
    toast.onDidDismiss((data, role) => {
      if (role== "close") {
        this.add(item);
      }
    });
  }

  public add(item) {
    if (!this.app.subsetOf([item.name], this.app.namesArrayFromObjList(this.myItems))){
      this.myItems.push(item);
    }
    for (var i=0; i < this.suggestedItems.length; i++) {
      if (this.suggestedItems[i].id === item.id) {
        this.suggestedItems.splice(i,1);
      }
    }
    this.recalculate();
  }

  public remove(item) {
    /* if (!this.subsetOf([item.name], this.namesArrayFromObjList(this.suggestedItems))){
      this.suggestedItems.push(item);
    }*/
    for (var i=0; i < this.myItems.length; i++) {
      if (this.myItems[i].name === item.name) {
        this.presentToast(item);
        this.myItems.splice(i,1);
      }
    }
    this.recalculate();
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

  showConfirm(item) {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'That you want to delete this item from shopping list?',
      buttons: [
        {
          text: 'No, undo',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes, delete',
          handler: () => {
            remove(item);
          }
        }
      ]
    });
    confirm.present();
  }

  public countMissingItemsCat(id){
    return this.app.countMissingItemsCat(id);
  }

  public countItemsInCat(id) {
    return this.app.countItemsInCat(id);
  }

  public getCategoryColor(id){
    return this.app.getCategoryColor(id);
  }

}
