import { Component, OnInit } from '@angular/core';
import { sell001 } from '../sell-model/sell001';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { SellService } from '../sell.service';
import { ItmDefaultImg } from 'src/app/itm/model/ItemModel';
import { sellBucket } from '../sell-model/sellBucket';


@Component({
  selector: 'app-sell001',
  templateUrl: './sell001.component.html',
  styleUrls: ['./sell001.component.scss'],
})
export class Sell001Component implements  OnInit {

  public item: sell001;
  public srchItem: any;
  public showListItem = true;
  public itemInBucket: sellBucket[] = [];
  public alertNumberOfItem = 0;
  public checkVal: any;
  public img :  any;
  public base64Image: any;
  public seachBarcode : boolean = false;

  constructor(
    private sellService: SellService,
    private router: Router,
    private common: CommonService
    ) {}

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
    if(this.sellService.Bucket.length > 0){
      this.itemInBucket = this.sellService.Bucket;
    }
    this.alertNumberOfItem = this.itemInBucket.length;
    this.alertItem = true;
  }


  ionViewWillEnter(){
    this.alertNumberOfItem = this.itemInBucket.length;
    this.search(event,"scan");
  }


  getItemAllByShopId(){
    this.sellService.getindItemSellByShopId().subscribe(res => {
      this.item = res;
      this.srchItem = this.item;
      this.checkDataItem();
    });
    this.sellService.getDefault().subscribe(ref => {
      this.img = ref as ItmDefaultImg;
    });
  }

  goPageScan(){
    this.router.navigate(['sell002']);
  }

  goPageBucket(){
    this.router.navigate(['bucket']);
  }

  goPageNoti(){

    this.router.navigate(['noti001']);
  }

  goPageReport(){
    this.router.navigate(['sso001']);
  }

  goPageItm(){
    this.cleanSerach();
    this.router.navigate(['itm002']);
  }

  getFindItemByData(data:string){
    this.sellService.findItemByData(data).subscribe(res => {
      this.item = res;
      this.srchItem = this.item;
      this.checkDataItem();
    });
    
  }
  public alertItem:boolean = true;

  ionViewWillLeave(){
    this.cleanSerach();
  }

  cleanSerach(){
    this.common.dataSearch = "";
    this.common.getBarcode = "";
  }

  search(event,checkerScan = "none") {
    this.seachBarcode = false;
    if(this.common.getBarcode != ""){
      event.target.value = this.common.getBarcode;
      this.common.dataSearch = this.common.getBarcode;
      this.common.getBarcode = "";
    }

    let val = event.target.value;

    if(this.common.dataSearch == "" && this.common.getBarcode == "" && checkerScan == "scan"){
      val = "";
    }
    if (val && val.trim() !== '') {
        this.getFindItemByData(event.target.value.toString());
        this.alertItem = false;
    }
    else if(val.trim() === ''){
      this.getItemAllByShopId();
      this.cleanSerach();
      this.seachBarcode = false;
      this.showListItem = true;
      this.checkDataItem();
    }

      this.common.dataSearch = val;
      event.target.val = val;
      this.checkDataItem();
      if(this.common.dataSearch == '' && this.showListItem == false){
        this.alertItem = true;
        this.cleanSerach();
      }
   
  }


  addItemInBucket(Id){
    let itemId = -1;
    for(let i=0;i<Object.keys(this.item).length;i++){
      if(this.item[i].id == Id){
        itemId = i;
        break; 
      }
    }
    let numOfItem = this.itemInBucket.length;
    if(numOfItem == 0){
      this.itemInBucket.push({
        'id':this.item[itemId].id,
        'itemcode':this.item[itemId].itemcode,
        'itemname':this.item[itemId].itemname,
        'img':this.item[itemId].img,
        'itemcapacity':this.item[itemId].itemcapacity,
        'itemunit':this.item[itemId].itemunit,
        'itemprice':parseFloat(this.item[itemId].itemprice).toFixed(2),
        'numberItem':1,
        'stockItem':this.item[itemId].stockItem
      });
    }else{
      let check = 0;
      for(let j=0;j<this.itemInBucket.length;j++){
        if(this.itemInBucket[j].id == Id ){
          if(this.itemInBucket[j].numberItem < this.itemInBucket[j].stockItem){
            this.itemInBucket[j].numberItem += 1;
          }
          check = 1;
          break;
        }
      }
      if(check == 0){
        this.itemInBucket.push({
          'id':this.item[itemId].id,
          'itemcode':this.item[itemId].itemcode,
          'itemname':this.item[itemId].itemname,
          'img':this.item[itemId].img,
          'itemcapacity':this.item[itemId].itemcapacity,
          'itemunit':this.item[itemId].itemunit,
          'itemprice':parseFloat(this.item[itemId].itemprice).toFixed(2),
          'numberItem':1,
          'stockItem':this.item[itemId].stockItem
        });
      }
      check = 0;
    }
    this.sellService.Bucket = this.itemInBucket;
    this.alertNumberOfItem = this.itemInBucket.length;
  }
}
