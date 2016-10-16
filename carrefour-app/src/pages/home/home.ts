import { Component } from '@angular/core';

import { NavController, ToastController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';

Array.prototype.diff = function(a) {
  return this.filter(function(i) {return a.indexOf(i) < 0;});
};

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  constructor(public navCtrl: NavController, private toastCtrl: ToastController) {
    this.recalculate();
  }

  // DEFINITIONS

  public myItems = [
    { id : 1, name: "CERVEZA MAHOU CLAS", discounted: 0 },
    { id : 2, name: "KETCHUP 50%MENO AZUC", discounted: 0 },
    { id : 3, name: "MACARRONES CARREFOUR", discounted: 0 },
    { id : 4, name: "PECHUGA PAVO ELPOZO", discounted: 0 },
    { id : 5, name: "PAN BIMBO CORTEZA", discounted: 0 }
  ];

  public suggestedItems = [
    { id : 1, name: "TINTE OLIA 9.3GOLDEN", discounted: 0, discount: 25 },
    { id : 2, name: "COCA COLA BI-PACK", discounted: 0 },
    { id : 3, name: "LECHE SEMI. PRESID", discounted: 0 }
  ];

  public promotions = [
    {
      id: 1,
      items: ['CERVEZA MAHOU CLAS','KETCHUP 50%MENO AZUC','LECHE SEMI. PRESID'],
      discountType: 2,
      discountAmount: 5,
      count: 3,
      discountedItem: {
        id : 6, name: "50% discount on green items", discounted: 1
      }
    },
    {
      id: 2,
      items: ['MACARRONES CARREFOUR','PECHUGA PAVO ELPOZO','MANZANA GOLDEN','QUESO BARRA EDAM'],
      discountType: 1,
      discountAmount: 50,
      count: 4,
      discountedItem: {
        id : 7, name: "FREE Snickers!", discounted: 1
      }
    }
  ];

  public categoryColors = {
    id_1: '#d2ffb1',
    id_2: '#EAD9FF'
  };

  // FUNCTIONS
  recalculate() {

    // --------- myList generation
    // Adding discounted items
    var discounts = this.getFulfilledDiscountInfo(this.myItems);
    for (var i=0; i < discounts.length; i++) {
      if (!this.subsetOf([discounts[i].discountedItem.name], this.namesArrayFromObjList(this.myItems))){
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
    var missing = this.getMissingItems(this.myItems);
    for (var i = 0; i < missing.length; i++) {
      for (var k = 0; k < missing[i].items.length; k++) {
        if (!this.subsetOf([missing[i].items[k]], this.namesArrayFromObjList(this.suggestedItems))){
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

  public getCategoryColor(id) {
    return this.categoryColors['id_' + id];
  }

  // Given an item object, fins to which discount categories it belongs to
  public getItemDiscountCategories(item) {
    var ids = [];
    for (var i = 0; i < this.promotions.length; i++) {
      var items = this.promotions[i].items;
      for (var k = 0; k < items.length; k++) {
        if (item.name == items[k]) {
          ids.push(this.promotions[i].id);
        }
      }
    }
    return ids[0] ? ids[0] : null;
  }

  public subsetOf(arr1, arr2) {
    return arr1.every(elem => arr2.indexOf(elem) > -1);
  }

  public namesArrayFromObjList(objArr){
    var arr = [];
    for (var i=0; i < objArr.length; i++) {
      arr.push(objArr[i].name);
    }
    return arr;
  }

  public getFulfilledDiscountInfo(itemList){
    var discounts = [];
    for (var i=0; i < this.promotions.length; i++) {
      var categoryItems = this.promotions[i].items;
      var itemNames = this.namesArrayFromObjList(itemList);
      if (this.subsetOf(categoryItems, itemNames)){
        discounts.push(this.promotions[i]);
      }
    }
    return discounts;
  }

  public getMissingItems(itemList){
    var missing = [];
    for (var i=0; i < this.promotions.length; i++) {
      var categoryItems = this.promotions[i].items;
      if (!this.subsetOf(itemList, categoryItems)) {
        var itemNames = this.namesArrayFromObjList(itemList);
        var missingPerCat = categoryItems.diff(itemNames);
        missing.push({
          id: this.promotions[i].id,
          items: missingPerCat
        });
      }
    }
    return missing;
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
    if (!this.subsetOf([item.name], this.namesArrayFromObjList(this.myItems))){
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
    if (!this.subsetOf([item.name], this.namesArrayFromObjList(this.suggestedItems))){
      this.suggestedItems.push(item);
    }
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

}
