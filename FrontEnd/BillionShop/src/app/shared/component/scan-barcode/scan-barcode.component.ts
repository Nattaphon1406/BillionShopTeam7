import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { CommonService } from '../../services/common/common.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-scan-barcode',
  templateUrl: './scan-barcode.component.html',
  styleUrls: ['./scan-barcode.component.scss'],
})
export class ScanBarcodeComponent implements AfterViewInit,OnDestroy {

  constructor(private alertController:AlertController,
              private location: Location,
              private commonService: CommonService) {
                this.startScanner();
               }


  ngAfterViewInit(){
    BarcodeScanner.prepare();
  }
  ngOnDestroy(){
    BarcodeScanner.stopScan();
  }
  result = null;
  test:any;
  async startScanner(){

    const allowed = await this.checkPermission();
    BarcodeScanner.hideBackground(); 
    if(allowed){
      const result = await BarcodeScanner.startScan();
      this.test = result.content;
      this.commonService.getBarcode = this.test;
      if (result.hasContent) {
        console.log(result.content); // log the raw scanned content
      }
      BarcodeScanner.stopScan();
       this.location.back();

    }


  }

    stopScanner(){
    BarcodeScanner.stopScan();
  }

  async checkPermission(){
    return new Promise(async (resolve, reject) => {
          const status = await BarcodeScanner.checkPermission({ force: true });
          if (status.granted){
            resolve(true);
          }else if(status.denied){
            const alert = await this.alertController.create({
              header:'No permission',
              message: 'Please allow camera access in your setting',
              buttons: [{
                text: 'ไม่ใช่',
                role: 'cancel'
              },{
                text: 'ตั้งค่า',
                handler: ()=>{
                  // BarcodeScanner.openAppSettings();
                  BarcodeScanner.openAppSettings();
                  resolve(false);
                }
              }]
            });
            await alert.present();
          }else{
            resolve(false);
          }
    });
  }
}
