import { Component } from '@angular/core';

import { NavController, ToastController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public myItems = [
    { id : 1, name: "Tomas", price: 5 },
    { id : 2, name: "Jeroen", price: 5 },
    { id : 3, name: "Ryan", price: 5 },
    { id : 4, name: "Tomas", price: 5 },
    { id : 5, name: "Jeroen", price: 5 }
  ];

  public suggestedItems = [
    { id : 1, name: "Tomas", price: 5 },
    { id : 2, name: "Jeroen", price: 5 },
    { id : 3, name: "Ryan", price: 'free' }
  ];

  public promotions = [
    {
      items: ['','',''],
      discount: 5,
      freeItem: ''
    },
  ]

  public removedItems = [];

  constructor(public navCtrl: NavController, private toastCtrl: ToastController) {
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
  presentToast(item) {
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

  remove(item) {
    this.suggestedItems.push(item);
    for (var i=0; i < this.myItems.length; i++) {
      if (this.myItems[i].id === item.id) {
        //this.removedItems.push(this.myItems[i]);
        this.presentToast(item);
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

  euro(int) {
    if (int > 0) {
      var nr:String = String(int);
      return nr + '€';
    } else {
      return int;
    }
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
