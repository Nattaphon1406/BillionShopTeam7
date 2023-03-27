import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mms002Service } from '../../service/mms002.service';
import { mms002} from '../model/mms002';
import { Mms001Service } from '../../service/mms001.service';
import { DatePipe } from '@angular/common';
import { mmsList } from '../model/mmsList';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-mms002',
  templateUrl: './mms002.component.html',
  styleUrls: ['./mms002.component.scss'],
})
export class Mms002Component implements OnInit {
  public mms002: Array<mms002> = [] as Array<mms002>;
  mmsData: any;
  public mmsDate:string = '';
  public shopId = Number(localStorage.getItem('shopId'));
  public date:any;
  public mvmList: mmsList;

  constructor(
    private mss002Service: Mms002Service,
    private router: Router,
    private mms001Service: Mms001Service,
    private datepipe:DatePipe,
    public common: CommonService,
  ) { }

  ngOnInit() {
    this.date = this.mms001Service.date;
    this.mmsDate = this.mms001Service.date;
    this.date = this.datepipe.transform(new Date(this.mms001Service.date),'dd/MM/yyyy'); 
    this.getfindListMovementByshopId('');
  }

  ionViewDidEnter(){
    this.search(event,"scan");
  }

  ionViewWillLeave(){
    this.common.dataSearch = '';
    this.common.getBarcode = "";
  }

  public alertItem:boolean = false;
  public seachBarcode: boolean = false;
  public showListItem = true;
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
        this.getfindListMovementByshopId(event.target.value.toString());
    }
    else if(val.trim() === ''){
      this.getfindListMovementByshopId('');
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

  checkAlertItem(){
    if (Object.keys(this.mmsData).length == 0) {
      this.alertItem = true;
    } else {
      this.alertItem = false;
    }
  }  

  checkDataItem() {
    if (Object.keys(this.mmsData).length == 0) {
      this.showListItem = false;
    } else {
      this.showListItem = true;
    }
  }


  getfindListMovementByshopId(data){
    if(data.trim() == ''){
      data = "";
    }
    this.mss002Service.findListMovementByshopId(data,this.mmsDate,this.shopId).subscribe( res =>{
      this.mmsData = res;
      this.checkDataItem();
      this.checkAlertItem();
    });
  }

  public goPageDetailMoveMent(itmid:number) {
    this.mvmList = {
      'smDate': this.mmsDate,
      'itmId': itmid
    }
    this.mss002Service.mmmList = this.mvmList;
    
    this.router.navigate(['mms003']);
  }
}
