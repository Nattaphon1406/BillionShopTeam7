import { Component, OnInit } from '@angular/core';
import { Pco001Service } from '../service/pco001.service';
import { Pco001 } from './model/pco001';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Pco00102Service } from '../service/pco00102.service';


@Component({
  selector: 'app-pco001',
  templateUrl: './pco001.component.html',
  styleUrls: ['./pco001.component.scss'],
})
export class Pco001Component implements OnInit {
  public pos: Pco001;
  public srchPos: any;
  public showListPo = true;
  public alertSearchNotFound = false;
  public shopId = Number(localStorage.getItem('shopId'));
  poCreateBy: string;
  poGenUser: string;
  searchInStatus: string = "pco";

  constructor(
    private pco001Service: Pco001Service,
    private alertCtrl: AlertController,
    private router: Router,
    private Pco00102: Pco00102Service,
  ) { }

  ngOnInit() {
    this.poGenUser = localStorage.getItem('nameUser');
    this.poCreateBy = localStorage.getItem('userName');
  }

  ionViewWillEnter(){
    this.getPoAllByShopId();
  }

  search(event) {
    
    let val = event.target.value;
    if (val && val.trim() !== '') {
      this.getFindPoData(val);
    } else if (val.trim() === '') {
      this.getPoAllByShopId();
      this.alertSearchNotFound = false;
    }
  }
  
  getPoAllByShopId() {
    this.pco001Service.getPoDataByShopId(this.shopId, this.searchInStatus).subscribe(res => {
      this.pos = res;
      this.srchPos = this.pos;
      this.checkDataPO();
    });
  }

  getFindPoData(data: string) {
    this.pco001Service.getFindPoData(data, this.shopId).subscribe(res => {
      this.pos = res;
      this.srchPos = this.pos;
      this.checkDataPO();
      if(this.showListPo == false){
        this.alertSearchNotFound = true;
      }
    });
  }

  public goPagePO() {
    this.router.navigate(['pco001/pco00102']);
  }

  public async modalCreatePO() {
    const alert = await this.alertCtrl.create({
      cssClass: 'alert-create-po',
      backdropDismiss: true,
      buttons: [
        {
          text: 'สร้างใบสั่งซื้อ',
          handler: () => {
            this.Pco00102.setStatusPO("Manual");
            this.goPagePO();
          }
        }, {
          text: 'สร้างใบสั่งซื้ออัตโนมัติ',
          handler: () => {
            this.Pco00102.setStatusPO("Auto");
            this.goPagePO();
          }
        }

      ]
    });

    await alert.present();
  }

  public showDetailPO(poId,poStatus) {
    if (poStatus == 'อยู่ระหว่างดำเนินการ') {
      this.router.navigate(['pco001/pco00102',{poId: poId}]);
    } else {
      this.router.navigate(['pco001/pco00101',{poId: poId}]);
    }
  }

  checkDataPO() {
    if (Object.keys(this.pos).length == 0) {
      this.showListPo = false;
    } else {
      this.showListPo = true;
    }
  }
}
