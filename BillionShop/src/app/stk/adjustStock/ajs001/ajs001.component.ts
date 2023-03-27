import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { Ajs001Service } from '../../service/ajs001.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ajs001',
  templateUrl: './ajs001.component.html',
  styleUrls: ['./ajs001.component.scss'],
})
export class Ajs001Component implements OnInit {
  itms: any;
  srchItms: any;
  public shopId = Number(localStorage.getItem('shopId'));
  public alertSearchNotFound = false;
  public showListAjs = true;

  constructor(
    private ajs001Service: Ajs001Service,
    private router: Router,
    private common: CommonService,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.getAdjustStockHeader();
  }

  search(event) {
    let val = event.target.value;
    if (val && val.trim() !== '') {
      this.getFindAdjustStockฺByData(val);
    } else if (val.trim() === '') {
      this.getAdjustStockHeader();
      this.alertSearchNotFound = false;
    }
  }

  getFindAdjustStockฺByData(data: string) {
    this.ajs001Service.findStockAdjustByData(data, this.shopId).subscribe(res => {
      this.itms = res;
      this.srchItms = this.itms;
      this.checkDataPO();
      if (this.showListAjs == false) {
        this.alertSearchNotFound = true;
      }
    });
  }

  checkDataPO() {
    if (Object.keys(this.itms).length == 0) {
      this.showListAjs = false;
    } else {
      this.showListAjs = true;
    }
  }

  getAdjustStockHeader() {
    this.ajs001Service.getAdjustStockHeader(this.shopId).subscribe(res => {
      this.itms = res;
      this.srchItms = this.itms;
    });
  }

  showDetailAj(saId) {
    this.router.navigate(['ajs001/ajs00101', { saId: saId }]);
  }

  public async createAdjust() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      subHeader: 'ต้องการสร้างใบปรับสินค้าหรือไม่',
      buttons: [
        {
          text: 'ไม่ใช่'
        },
        {
          text: 'ใช่',
          handler: () => {
            this.router.navigate(['ajs001/ajs00102']);
          }
        }
      ]
    });
    await alert.present();
  }
}
