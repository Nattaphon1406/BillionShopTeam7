import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ParameterModel } from '../../model/common/parameter-model';
import { CommonService } from '../../services/common/common.service';
import { Pco00102Component } from '../../../pco/pco001/pco00102/pco00102.component';
import { Rcv002Component } from '../../../rcv/rcv002/rcv002.component'; 


@Component({
  selector: 'app-header-with-back-save',
  templateUrl: './header-with-back-save.component.html',
  styleUrls: ['./header-with-back-save.component.scss'],
})
export class HeaderWithBackSaveComponent implements OnInit {
  public backPath: any;
  public prmId: any;
  public fil: any;
  public header: any;
  public parameter: Array<ParameterModel> = [] as Array<ParameterModel>;
  public lang: any = 'TH';

  constructor(
    public router: Router,
    public pco00102Component: Pco00102Component,
    public rcv002Component: Rcv002Component,
    public activatedRoute: ActivatedRoute,
    public commonService: CommonService,
    public alertCtrl: AlertController) {
    this.prmId = activatedRoute.snapshot.data.prmId;
    this.backPath = activatedRoute.snapshot.data.backPath;
    this.commonService.getDemoParameterHeader().subscribe(res => {
      this.parameter = res as ParameterModel[];
      this.parameter.filter(e => e.prmHdrNo === 1
        && e.prmDtlCd === this.prmId
        && e.lang === this.lang).forEach(e => {
          this.header = e.desc;
        });
    });

  }

  ngOnInit() { }

  public async presentAlert_save() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      subHeader: 'ต้องการบันทึกข้อมูลหรือไม่',
      buttons: [
        {
          text: 'ไม่ใช่',
          handler: () => {
          }
        },
        {
          text: 'ใช่',
          handler: () => {
            if (this.header == 'สร้างใบสั่งซื้อ') {
              this.pco00102Component.checkInsertStatus(1);
            }
            else if (this.header == 'สร้างใบรับสินค้า') {
              this.rcv002Component.checkInsertStatus(1);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  goBackPagebtn() {
    this.router.navigate([this.backPath]);
  }
}
