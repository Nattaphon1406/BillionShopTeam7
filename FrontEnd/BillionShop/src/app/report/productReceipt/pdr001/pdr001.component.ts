import { Component, OnInit } from '@angular/core';
import { stockReport } from '../../model/pdr001';
import { Pdr001Service } from "../../service/pdr001.service";
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-pdr001',
  templateUrl: './pdr001.component.html',
  styleUrls: ['./pdr001.component.scss'],
})
export class Pdr001Component implements OnInit {
  public pdr:Array<stockReport> = [] as Array<stockReport>;
  public srchItms: any;
  public data: stockReport;
  public alertSearchNotFound = false;
  public seachBarcode: boolean = false;
  public alertItem:boolean = false;
  public showListItem = true;
  public checker:number = 0;
  public checkVal: any;
  constructor(
    public pdr001Service: Pdr001Service,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.getFindStockReport();
  }

  ionViewDidEnter(){
    this.search(event,"scan");
}
ionViewWillLeave(){
  this.common.dataSearch = '';
  this.common.getBarcode = "";
}
  getFindStockReport(){
    this.pdr001Service.findStockReportById(Number(localStorage.getItem('shopId'))).subscribe(res => {
      this.data = res;
      this.srchItms = this.data; 
      this.checkDataItem();
    });
  }

  getFindStockReportByData(data:String){
    this.pdr001Service.findStockReportByData(data).subscribe(res => {
      this.data = res;
      this.checkDataItem();
      this.srchItms = this.data;
      this.alertSearchNotFound = true;
      if(data.length == 13 && this.data[0].barcode != null ){
        this.seachBarcode = true;
      }else{
        this.seachBarcode = false;
      }
      this.checkDataItem();
      this.checkAlertItem();
    });
  }

  checkDataItem() {

    if (Object.keys(this.data).length == 0) {
      this.showListItem = false;
    } else {
      this.showListItem = true;
    }
  }

  checkAlertItem(){
    if (Object.keys(this.data).length == 0) {
      this.alertItem = true;
    } else {
      this.alertItem = false;
    }
  }

  search(event,checkerScan = "none") {
    this.seachBarcode = false;

    if(this.common.getBarcode != ""){
      event.target.value = this.common.getBarcode;
      this.alertItem = false;
    }
    let val = event.target.value;
    if(this.common.dataSearch == "" && this.common.getBarcode == "" && checkerScan == "scan"){
      this.getFindStockReportByData(event.target.value.toString());
      val = "";
    }
    if (val && val.trim() !== '') {
        this.getFindStockReportByData(event.target.value.toString());
    }
    else if(val.trim() === ''){
      this.getFindStockReport();
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

}
