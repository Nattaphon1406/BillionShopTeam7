import { Component, OnInit } from '@angular/core';
import { Rcv001Service } from '../service/rcv001.service';
import { Rcv001_Head } from '../model/rcv00101_Head';
import { Router } from '@angular/router';
import { Rcv001 } from '../model/rcv001';

@Component({
  selector: 'app-rcv001',
  templateUrl: './rcv001.component.html',
  styleUrls: ['./rcv001.component.scss'],
})
export class Rcv001Component implements OnInit {
  public ri: Array<Rcv001_Head> = [] as Array<Rcv001_Head>;
  public data: Rcv001;
  public showListRcv: boolean = true;
  public alertSearchNotFound = false;
  srchItms: any;
  backupsrchItms: any;

  constructor(
    public router: Router,
    public rcv001Service: Rcv001Service,
  ) {

  }

  ngOnInit() {
   this.getFindRcv();
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  onSearch(event: any) {
    const val = event.target.value;
    if (val && val.trim() !== '') {
      this.getFindRcvData(val);
    } else if (val.trim() === '') {
      this.getFindRcv();
      this.alertSearchNotFound = false;
    }
  }

  getFindRcvData(data){
    this.rcv001Service.findRcvByData(data).subscribe(res => {
      this.data = res;
      this.srchItms = this.data;
      this.checkDataPO();
      this.alertSearchNotFound = true;
    });
  }

  getFindRcv(){
    this.rcv001Service.findHeadRcvAllById(Number(localStorage.getItem('shopId'))).subscribe(res => {
      this.data = res;
      this.srchItms = this.data;
      this.checkDataPO();
    });
  }

  findPoByData() {
    this.router.navigate(['rcv004']);
  }

  showDetailRcv(riId, riCode, riDate, poCode, riGenUser, riStatus) {
    if (riStatus == 'อยู่ระหว่างดำเนินการ') {
      this.router.navigate(['rcv002', { riId: riId }]);
    } else {
      this.router.navigate(['rcv001/rcv00101', { riId: riId, riCode: riCode, riDate: riDate, poCode: poCode, riGenUser: riGenUser, riStatus: riStatus }]);
    }
  }

  checkDataPO() {
    if (Object.keys(this.srchItms).length == 0) {
      this.showListRcv = false;
    } else {
      this.showListRcv = true;
    }
  }

}