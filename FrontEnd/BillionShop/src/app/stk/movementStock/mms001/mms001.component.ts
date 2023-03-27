import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Mms001Service } from '../../service/mms001.service';
import { mms001, showList } from '../model/mms001';

@Component({
  selector: 'app-mms001',
  templateUrl: './mms001.component.html',
  styleUrls: ['./mms001.component.scss'],
})
export class Mms001Component implements OnInit {

  constructor(
    private router: Router, 
    public datepipe:DatePipe,
    private mms001Service: Mms001Service,
  ) { }

  public srchItms:any; 
  public test:any;
  gotolistmovement(date:string) {

    date = date.substring(6)+"-"+date.substring(3,5)+"-"+date.substring(0,2);
    date = this.datepipe.transform(new Date(date), 'yyyy-MM-dd');
    this.mms001Service.date = date;
    this.router.navigate(['mms002']); 
  }

  ngOnInit() {
    this.setToday();
    this.setFormate();
  }

  dateValue1 = "";
  dateValue2 = "";
  toDay:any;
  min:string;
  minShow:string;
  setToday(){
    this.dateValue1 = this.datepipe.transform(Date(),'MMM d, yyyy');
    this.dateValue2 = this.dateValue1;
    this.minShow = this.datepipe.transform(new Date(this.dateValue1), 'MMM d, yyyy')
    this.min = this.datepipe.transform(new Date(this.dateValue1), 'yyyy-MM-dd').toString();
    this.toDay = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  }

  dateChangedFirst(value){
    let formate = this.datepipe.transform(new Date(value), 'MMM d, yyyy');
    this.min = this.datepipe.transform(new Date(value), 'yyyy-MM-dd').toString();
    this.minShow = this.datepipe.transform(new Date(formate), 'MMM d, yyyy');
    this.dateValue1 = formate;
    if(this.datepipe.transform(new Date(this.dateValue1), 'yyyy-MM-dd').toString() > this.datepipe.transform(new Date(this.dateValue2), 'yyyy-MM-dd').toString()){
      this.dateValue2 = this.dateValue1;
    }
    this.setFormate();
  }

  dateChangedSecond(value2){
    let formate2 = this.datepipe.transform(new Date(value2), 'MMM d, yyyy');
    this.min = this.datepipe.transform(new Date(this.dateValue1), 'yyyy-MM-dd').toString();
    this.minShow = this.datepipe.transform(new Date(formate2), 'MMM d, yyyy');
    this.dateValue2 = formate2;
    this.setFormate();
  }

  dateSend1 = "";
  dateSend2 = "";
  setFormate(){
    let formate = this.datepipe.transform(new Date(this.dateValue1), 'yyyy-MM-dd');
    this.dateSend1 = formate;
    let formate2 = this.datepipe.transform(new Date(this.dateValue2), 'yyyy-MM-dd');
    this.dateSend2 = formate2;
    
    this.findStockMovement(); 
  }

  findStockMovement(){
    let findStockMove:mms001 ={
      'dateFrom': this.dateSend1,
      'dateTo': this.dateSend2,
      'shopId': Number(localStorage.getItem('shopId'))
    }
    this.mms001Service.findListMovementByDate(findStockMove).subscribe(res =>{
      this.srchItms = res;
      for(let i=0;i<Object.keys(res).length;i++){
        this.srchItms[i].datemovement = this.datepipe.transform(new Date(res[i].datemovement), 'dd/MM/YYYY');
      }

    });

  }


}
