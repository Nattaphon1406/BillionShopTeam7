import { Component, OnInit } from '@angular/core';
import { Itm001Service } from '../service/itm001.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { ItmDetail001 } from '../model/ItemModel';
@Component({
  selector: 'app-itm001',
  templateUrl: './itm001.component.html',
  styleUrls: ['./itm001.component.scss'],
})
export class Itm001Component implements OnInit {

  public item: ItmDetail001;
  public srchItem: any;
  public showListItem = true;
  public checker:number = 0;

  public checkVal: any;
  public img: any;
  public base64Image: any;
  public seachBarcode: boolean = false;
  constructor(
    private Itm001Service: Itm001Service,
    private router: Router,
    private common: CommonService
  ) {
  }
  checkDataItem() {

    if (Object.keys(this.item).length == 0) {
      this.showListItem = false;
    } else {
      this.showListItem = true;
    }
  }
  public shopId = Number(localStorage.getItem("shopId"));
  ngOnInit() {
    this.shopId = Number(localStorage.getItem("shopId"));
  }


  ionViewDidEnter(){
      this.search(event,"scan");
  }
  
  getItemAllByShopId() {
    this.Itm001Service.getItemDatabyShopId(this.shopId).subscribe(res => {
      this.item = res;
      this.srchItem = this.item;
      this.checkDataItem();
    });
  }

  getFindItemByData(data: string) {
    this.Itm001Service.getFindItemData(data, this.shopId).subscribe(res => {
      this.item = res;
      this.checkDataItem();
      if(data.length == 13 && this.item[0].barcode != null ){
        this.seachBarcode = true;
      }else{
        this.seachBarcode = false;
      }
      this.srchItem = this.item;
      this.checkDataItem();
      this.checkAlertItem();
    });
  }


  checkAlertItem(){
    if (Object.keys(this.item).length == 0) {
      this.alertItem = true;
    } else {
      this.alertItem = false;
    }
  }

  public alertItem:boolean = false;
  search(event,checkerScan = "none") {
    this.seachBarcode = false;

    if(this.common.getBarcode != ""){
      event.target.value = this.common.getBarcode;
      this.alertItem = false;
    }
    let val = event.target.value;
    if(this.common.dataSearch == "" && this.common.getBarcode == "" && checkerScan == "scan"){
      val = "";
    }
    if (val && val.trim() !== '') {
        this.getFindItemByData(event.target.value.toString());
    }
    else if(val.trim() === ''){
      this.getItemAllByShopId();
      this.common.dataSearch = '';
      this.showListItem = true;
      this.common.getBarcode = "";
      this.checkDataItem();
      this.checkAlertItem();
    }
      this.common.dataSearch = val;
      event.target.val = val;
      if(this.common.dataSearch == '' && this.showListItem == false){
        this.alertItem = false;
      }
  }

  edit(id) {
    this.router.navigate(['itm002', { itm_id: id }]);
  }

  btnAdd() {
    this.router.navigate(['itm002', { itm_id: 0 }]);
  }

  ionViewWillLeave(){
    this.common.dataSearch = '';
    this.common.getBarcode = "";
  }
}
