import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SellService } from '../sell.service';
import { sellBucket } from '../sell-model/sellBucket';
import { sell001 } from '../sell-model/sell001';

@Component({
  selector: 'app-sell003',
  templateUrl: './sell003.component.html',
  styleUrls: ['./sell003.component.scss'],
})



export class Sell003Component implements OnInit {
  
  amount:any;
  public item: sell001;
  public srchItem: any;
  public showListItem = true;
  public img :  any;
  public base64Image: any;
  public itemInBucket: sellBucket[] = [];

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private sellService: SellService,
  ) { }

  checkDataItem(){

    if(Object.keys(this.item).length == 0){
      this.showListItem = false;
    }else{
      this.showListItem = true;
    }
  }

  public shopId = Number(localStorage.getItem("shopId"));

  ngOnInit() {
    this.shopId = Number(localStorage.getItem("shopId"));
    this.addItem();
    
  }

 addItem(){
    this.itemInBucket = this.sellService.Bucket;
    this.getTotal();
 }

  public async AlertDeleteProduct(itmId) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      subHeader: 'ต้องการลบรายการนี้หรือไม่',
      buttons: [
        {
          text: 'ไม่ใช่',
          handler: () => {
          }
        },
        {
          text: 'ใช่',
          handler: () => {
            let i = this.itemInBucket.indexOf(this.itemInBucket.find(e => itmId == e.id));
            this.itemInBucket.splice(i,1);
            this.getTotal();
            this.sellService.Bucket = this.itemInBucket;
            
          }
        }
      ]
    });

    await alert.present();
  }

  gocheck(){
    this.router.navigate(['payment']);
    this.getTotal();
  }

  clickEditnumber(itemId:number,itemOption:string){
    let num = this.itemInBucket.indexOf(this.itemInBucket.find(e => e.id == itemId));
    if(itemOption == 'add' && this.itemInBucket[num].numberItem < this.itemInBucket[num].stockItem){
      this.itemInBucket[num].numberItem += 1;
    }else if(itemOption == 'remove'){
      if(this.itemInBucket[num].numberItem > 1){
        this.itemInBucket[num].numberItem -= 1;
      }
    }
    this.getTotal();
  }
public totalPrice:number = 0;
public checkEmty:boolean = true;
  getTotal() {
    // return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
    this.totalPrice = 0;
    this.itemInBucket.forEach(e => {
      this.totalPrice = (e.numberItem * e.itemprice)+this.totalPrice;
      this.checkEm();
    });
    this.checkEm();
    this.sellService.totalPrice = this.totalPrice;
  }

  checkEm(){
    if(this.itemInBucket.length == 0){
      this.checkEmty = true;
    }else{
      this.checkEmty = false;
    }
  }
}
