import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../../shared/services/common/common.service';
import { Mms003Service } from '../../service/mms003.service';
import { Mms002Service } from '../../service/mms002.service';
import { mmsList } from '../model/mmsList';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mms003',
  templateUrl: './mms003.component.html',
  styleUrls: ['./mms003.component.scss'],
})
export class Mms003Component implements OnInit {
  itms: any;
  hitms: any;
  srchItms: any;
  public mms_date:string = '';
  private date:any;
  itm_code: string;
  itm_name: string;
  itm_capacity: number;
  itm_sell_unit: string;
  itm_unit: string;
  stk_quoted: string;
  stk_remain: string;
  public mvmList: mmsList;

  constructor(
    private router: Router,
    private common: CommonService,
    private Mms003Service: Mms003Service,
    private Mms002Service:Mms002Service,
    private datepipe:DatePipe,
  ) { }

  public docDate:string;
  ngOnInit() {
    this.mvmList = this.Mms002Service.mmmList;
    this.getMovementitemHeader();
    this.getMovementitemDetail();
    this.mms_date = this.mvmList.smDate;
    this.mms_date = this.datepipe.transform(new Date(this.mms_date),'yyyy-MM-dd');
    this.docDate = this.datepipe.transform(this.mms_date,'dd/MM/yyyy');  
  }

  getMovementitemHeader(){

    this.Mms003Service.findHederMovementByshopId(this.mvmList.smDate,Number(localStorage.getItem('shopId')),this.mvmList.itmId ).subscribe(res=>{
      this.itm_code = res[0].itmcode;
      this.itm_name = res[0].itmname;
      this.itm_capacity = res[0].itmcapacity;
      this.itm_unit = res[0].itmunit;
      this.itm_sell_unit = res[0].itmsellunit;
      this.stk_quoted = res[0].smbalanceforward.toString();
      this.stk_remain = res[0].smbalance.toString();
    })

  }

  getMovementitemDetail(){
    this.Mms003Service.findDetailMovementByshopId(this.mvmList.smDate,Number(localStorage.getItem('shopId')),this.mvmList.itmId ).subscribe(res=>{
      this.itms = res;
      this.srchItms = this.itms;
    });
  }

  ionViewWillLeave(){
    this.Mms002Service.mmmList = null;
  }


}
