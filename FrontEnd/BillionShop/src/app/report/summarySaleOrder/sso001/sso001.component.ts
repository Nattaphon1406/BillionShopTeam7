import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { searchReport, Sso001 } from '../../model/sso001';
import { ReportService } from '../../service/report.service';
import { DatePipe } from '@angular/common';
import { CommonService } from '../../../shared/services/common/common.service';

@Component({
  selector: 'app-sso001',
  templateUrl: './sso001.component.html',
  styleUrls: ['./sso001.component.scss'],
})
export class Sso001Component implements OnInit {
  public reports: Sso001;
  public srchRps: any;
  public shopId = Number(localStorage.getItem('shopId'));
  public searchBarcode: boolean = false;
  public alertSearchNotFound = false;
  public showListSalesReport = true;
  totalSales: number = 0;

  constructor(
    private reportService: ReportService, 
    private router: Router,
    public common: CommonService,
    private datepipe:DatePipe
  ) { }

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
    this.findSalesReport(this.dataSearch);
  }

  ionViewDidEnter(){
    this.search(event,"scan");
  }

  ionViewWillLeave(){
    this.common.dataSearch = '';
    this.common.getBarcode = "";
  }

  getSaleReport(){
      this.reportService.getSaleReportData(this.shopId).subscribe(res=>{
        this.reports = res;
        this.srchRps = this.reports;

          for(var i = 0; i < Object.keys(res).length; i++){
            if(res[i].itm_sales_all>this.totalSales){
              this.totalSales = res[i].itm_sales_all;
            }
          }
        this.checkDataSalesReport();
      });
  }

  findSalesReport(data: string) {
    let dataSearch:searchReport;
    if(data.trim() === ''){
      data = "";
    }
      dataSearch = {
        'data': data,
        'dateFrom': this.dateSend1,
        'dateTo': this.dateSend2,
        'shopId': this.shopId
      }
        this.reportService.getFindSalesReportData(dataSearch).subscribe(res => {
          this.reports = res;
          this.totalSales = 0;
          this.srchRps = this.reports;
          if(data = ""){
            this.common.dataSearch = '';
            this.showListSalesReport = true;
            this.common.getBarcode = "";
          }
          for(var i = 0; i < Object.keys(this.reports).length; i++){
              this.totalSales += Number(this.reports[i].itm_sales);
          }
          this.checkDataSalesReport();
          this.checkAlertSearchNotFound();

        });

  }
  public dataSearch = "";
  search(event,checkerScan = "none") {
    this.searchBarcode = false; 
 
    
    if(this.common.getBarcode != ""){
      event.target.value = this.common.getBarcode;
      this.dataSearch = this.common.getBarcode;
      this.alertSearchNotFound = false;
    }
    let val = event.target.value;
    if(this.common.dataSearch == "" && this.common.getBarcode == "" && checkerScan == "scan"){
      val = "";
    }
    if (val && val.trim() !== '') {
      this.dataSearch = event.target.value.toString();
      this.findSalesReport(this.dataSearch);

    } else if (val.trim() === '') {
      this.dataSearch = "";
      this.findSalesReport(this.dataSearch);
      this.common.dataSearch = '';
      this.showListSalesReport = true;
      this.common.getBarcode = "";
      this.checkDataSalesReport();
      this.checkAlertSearchNotFound();
    }
    this.dataSearch = val;
    this.common.dataSearch = val;
    event.target.val = val;
    if(this.common.dataSearch == '' && this.showListSalesReport == false){
      this.alertSearchNotFound = false;
    }
  }

  checkAlertSearchNotFound(){
    if (Object.keys(this.reports).length == 0) {
      if(this.dataSearch.trim() === ""){
        this.alertSearchNotFound = false;
      }else{
        this.alertSearchNotFound = true;
      }
      
    } else {
      this.alertSearchNotFound = false;
    }
  }

  checkDataSalesReport() {
    if (Object.keys(this.reports).length == 0) {
      this.showListSalesReport = false;
    } else {
      this.showListSalesReport = true;
    }
  }
}
