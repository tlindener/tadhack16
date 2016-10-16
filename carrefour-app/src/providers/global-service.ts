import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GlobalService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GlobalService {

  constructor(public http: Http) {
    console.log('Hello GlobalService Provider');
  }

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
        id : 6, name: "50% discount on these items", discounted: 1
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
  
  public myItems = [
    { id : 1, name: "CERVEZA MAHOU CLAS", discounted: 0 },
    { id : 2, name: "KETCHUP 50%MENO AZUC", discounted: 0 },
    { id : 3, name: "MACARRONES CARREFOUR", discounted: 0 },
    { id : 4, name: "PECHUGA PAVO ELPOZO", discounted: 0 },
    { id : 5, name: "PAN BIMBO CORTEZA", discounted: 0 }
  ];

  public countItemsInCat(id){
    var count: int = 0;
    for (var i = 0; i < this.promotions.length; i++) {
      if (this.promotions[i].id == id) {
        count += this.promotions[i].items.length;
      }
    }
    return count;
  }

  public subsetOf(arr1, arr2) {
    return arr1.every(elem => arr2.indexOf(elem) > -1);
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

  public namesArrayFromObjList(objArr){
    var arr = [];
    for (var i=0; i < objArr.length; i++) {
      arr.push(objArr[i].name);
    }
    return arr;
  }

  public getCategoryColor(id) {
    return this.categoryColors['id_' + id];
  }

  public countMissingItemsCat(id){
    var missing = this.getMissingItems(this.myItems);
    var total = this.countItemsInCat(id);
    var count: int = 0;
    for (var i = 0; i < missing.length; i++) {
      if (missing[i].id == id) {
        count = missing[i].items.length;
      }
    }
    return total - count;
  }

}
