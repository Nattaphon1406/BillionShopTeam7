import { Component, OnInit } from '@angular/core';
import { Rcv004Service } from '../service/rcv004.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Pco001Service } from 'src/app/pco/service/pco001.service';
import { Rcv004_re } from '../model/rcv004_re';


@Component({
  selector: 'app-rcv004',
  templateUrl: './rcv004.component.html',
  styleUrls: ['./rcv004.component.scss'],
})
export class Rcv004Component implements OnInit {

  public pos: Rcv004_re;
  public srchPos: any;
  public showListPo = true;
  public shopId = Number(localStorage.getItem('shopId'));
  poCreateBy: string;
  poGenUser: string;
  searchInStatus: string = "rcv";

  constructor(
    private pco001Service: Pco001Service,
    private rcv004Service: Rcv004Service,
    private alertCtrl: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.shopId = Number(localStorage.getItem('shopId'));
    this.poGenUser = localStorage.getItem('userName');
    this.poCreateBy = localStorage.getItem('nameUser');
    this.getFindPoData("");

  }

  getPoAllByShopId() {
    this.pco001Service.getPoDataByShopId(this.shopId, this.searchInStatus).subscribe(res => {
      this.pos = res;
      this.srchPos = this.pos;
    });

  }

  getFindPoData(data: string) {
    this.rcv004Service.getRcvDataByShopId(this.shopId, data).subscribe(res => {
      this.pos = res;
      this.srchPos = this.pos;
      this.checkDataPO();
    });
  }

  public goBackHomePagePO(poCode, poId) {
    this.router.navigate(['rcv002', { poCode: poCode, poId: poId }]);
  }

  public async confirm(poCode, poId) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      subHeader: 'ต้องการสร้างใบรับสินค้าหรือไม่',
      buttons: [
        {
          text: 'ไม่ใช่'
        },
        {
          text: 'ใช่',
          handler: () => {
            this.goBackHomePagePO(poCode, poId);
          }
        }
      ]
    });

    await alert.present();
  }

  search(event) {
    let val = event.target.value;
    this.getFindPoData(val.toString());
  }

  checkDataPO() {
    if (Object.keys(this.pos).length == 0) {
      this.showListPo = false;
    } else {
      this.showListPo = true;
    }
  }

}
