import { Component, OnInit } from '@angular/core';
import { rcv002, RcvDeleteDetailRequest, RcvPutDetailRequest, RcvPutHeadRequest } from './../model/rcv002';
import { rcv002Service } from './../service/rcv002.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Pco00101Service } from 'src/app/pco/service/pco00101.service';
import { Rcv00101Service } from '../service/rcv00101.service';
import { Rcv00101_Detail } from '../model/rcv00101_Detail';
import { Rcv00101_Head } from '../model/rcv00101_Head';
import { ItmChooseListService } from 'src/app/shared/component/itm-choose-list/service/itm-choose-list.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { Pco00102Service } from 'src/app/pco/service/pco00102.service';
@Component({
  selector: 'app-rcv002',
  templateUrl: './rcv002.component.html',
  styleUrls: ['./rcv002.component.scss'],
})
export class Rcv002Component implements OnInit {
  rcv002: rcv002[] = [];
  public itmPo:rcv002[] = [];
  public itms: any;
  public srchItms: any;
  poCode: String;
  poId: number;
  name: string = '';
  isDisable: boolean = false;
  statusRcvInfo: number = null;

  riDelItem: RcvDeleteDetailRequest[] = [];

  public ri: Rcv00101_Head;
  public rid: Rcv00101_Detail;
  public srchRc: any;
  public shopId: Number = 1;
  public riId: Number;
  public checkVal: any;
  riCode: String;
  riDate: String;
  riGenUser: String;
  riStatus: String;
  type: any;

  constructor(
    private rcv002Service: rcv002Service,
    private alertCtrl: AlertController,
    private router: Router,
    private route: ActivatedRoute,
    private pco00101Service: Pco00101Service,
    private rcv00101Service: Rcv00101Service,
    private itmchooselist: ItmChooseListService,
    private pco00102Service: Pco00102Service,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.riId = Number(this.route.snapshot.paramMap.get("riId"));
    if (this.riId != 0) {
      this.rcv002Service.findHeadRcvById(this.riId).subscribe(res => {
        this.riCode = res[0].riCode;
        this.riGenUser = res[0].riGenUser;
        this.poCode = res[0].poCode;
        this.riStatus = "อยู่ระหว่างดำเนินการ";
        this.riDate = res[0].riDate;
      });
      this.rcv00101Service.findDetailRcvById(this.riId).subscribe(res => {
        for (var i = 0; i < Object.keys(res).length; i++) {
          this.rcv002.push({
            'itm_id': res[i].itm_id,
            'itm_code': res[i].itm_code,
            'itm_name': res[i].itm_name,
            'itm_capacity': res[i].itm_capacity,
            'itm_unit': res[i].itm_unit,
            'itm_quantity_per_unit': res[i].rid_quantity_per_unit,
            'itm_sell_unit': res[i].rid_item_unit,
            'itm_order_unit': res[i].rid_order_unit,
            'order_quantity': res[i].rid_receive_quantity,
            'ordAmount': res[i].rid_purchase_price
          })
        }
        this.itmPo = this.rcv002;
        this.itms = this.rcv002;
        this.srchItms = this.itms;
      });
    } else {
      this.poCode = this.route.snapshot.paramMap.get("poCode");
      this.poId = Number(this.route.snapshot.paramMap.get('poId'));
      this.genRcvHead();
      this.pco00101Service.getPoDetailDataByPoId(this.poId).subscribe(res => {
        for (var i = 0; i < Object.keys(res).length; i++) {
          this.rcv002.push({
            'itm_id': res[i].itm_id,
            'itm_code': res[i].itm_code,
            'itm_name': res[i].itm_name,
            'itm_capacity': res[i].itm_capacity,
            'itm_unit': res[i].itm_unit,
            'itm_quantity_per_unit': res[i].itm_quantity_per_unit,
            'itm_sell_unit': res[i].itm_sell_unit,
            'itm_order_unit': res[i].itm_order_unit,
            'order_quantity': '',
            'ordAmount': ''
          })
        }
        this.itmPo = this.rcv002;
        this.itms = this.rcv002;
        this.srchItms = this.itms;
      });
    }
  }

  getParam() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.type = params.get("type");
      this.riId = Number(params.get("riId"));
      this.riCode = (params.get("riCode"));
      this.riGenUser = (params.get("riGenUser"));
      this.poCode = (params.get("poCode"));
      this.riStatus = (params.get("riStatus"));
      this.riDate = (params.get("riDate"));
    });
    return this.type
  }

  genRcvHead() {
    this.rcv002Service.genRcvHead().subscribe(res => {
      this.riCode = res.riCode;
      this.riDate = res.riDate;
      this.riStatus = "อยู่ระหว่างดำเนินการ";
      this.riGenUser = localStorage.getItem("nameUser");
    });
  }

  public async btnConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      subHeader: 'ต้องการยืนยันข้อมูลหรือไม่',
      buttons: [
        {
          text: 'ไม่ใช่'
        },
        {
          text: 'ใช่',
          handler: () => {
            this.checkInsertStatus(2, 'confirm');
          }
        }
      ]
    });

    await alert.present();
  }

  public async btnDel(id) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      subHeader: 'ต้องการลบรายการนี้หรือไม่',
      buttons: [
        {
          text: 'ไม่ใช่',
          handler: () => {
          }
        },
        {
          text: 'ใช่',
          handler: () => {
            this.remove(id);
          }
        }
      ]
    });

    await alert.present();
  }
  public async btnDelAll() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      subHeader: 'ต้องการลบรายการทั้งหมดหรือไม่',
      buttons: [
        {
          text: 'ไม่ใช่',
          handler: () => {
          }
        },
        {
          text: 'ใช่',
          handler: () => {
            this.removeAll();
          }
        }
      ]
    });

    await alert.present();
  }

  public remove(id) {
    this.srchItms = this.srchItms.filter(item => item.itm_id !== id);
    this.riDelItem.push({
      'ri_code': this.riCode,
      'rid_itm_id': id
    });
    this.rcv002.splice(this.rcv002.findIndex(ref => ref.itm_id == id), 1);
    this.srchItms = this.rcv002;
    this.itms = this.rcv002;
  }

  public removeAll() {
    this.srchItms = this.srchItms.forEach(item => {
      this.riDelItem.push({
        'ri_code': this.riCode,
        'rid_itm_id': item.itm_id
      });
    });
    this.rcv002.splice(0);
    this.srchItms = this.rcv002;
    this.itms = this.rcv002;
  }

  public checker: boolean = false;
  public CheckerScanAddItem = false;
  public CheckerScanItem = false;
  public checkerChoose = false;
  public searchVal = "";

  public itemListPage() {
    this.checker = true;
    this.checkerChoose = true;
    this.router.navigate(['itm_choose']);
  }

  public barcodePage() {
    this.checker = true;
    this.CheckerScanAddItem = true;
    this.router.navigate(['scanBarcode']);
  }

  ionViewWillEnter() {
    this.searchVal = "";
    if (this.checker == true) {
      if (this.checkerChoose == true) {
        this.addItem();
        this.checkerChoose = false;
      }
    }
    if (this.CheckerScanItem == true) {
      this.searchVal = this.common.getBarcode;
      this.CheckerScanItem = false;

    }
    this.checker = false;
  }

  ngDoCheck() {
    if (this.CheckerScanAddItem == true) {
      this.CheckerScanAddItem = false;
      this.scanAddItem();
    } if (this.CheckerScanItem == true) {
      this.CheckerScanItem = false;
      this.CheckerScanAddItem = false;
      this.searchVal = this.common.getBarcode;
    }
  }

  public checkItemAdd(){
    for (let i = 0; i < this.itmPo.length; i++) {
        if(this.itmPo[i].itm_id == this.itmchooselist.listItem.itm_id){
          return true;
        }
    }
    return false;
  }

  public addItem() {
    let check = 0; //! เช็กไอเทมซ้ำ
    for (let i = 0; i < this.rcv002.length; i++) {
      if (this.rcv002[i].itm_id == this.itmchooselist.listItem.itm_id) {
        if (this.rcv002[i].order_quantity == '') {
          this.rcv002[i].order_quantity = '0';
        }
        this.rcv002[i].order_quantity = (Number(this.rcv002[i].order_quantity) + 1).toString();
        check = 1;
        break;
      }
    }
    if (check == 0) {
      if(this.checkItemAdd() == true){
        this.rcv002.push({
          'itm_id': this.itmchooselist.listItem.itm_id,
          'itm_code': this.itmchooselist.listItem.itm_code,
          'itm_name': this.itmchooselist.listItem.itm_name,
          'itm_capacity': this.itmchooselist.listItem.itm_capacity,
          'itm_unit': this.itmchooselist.listItem.itm_unit,
          'itm_quantity_per_unit': this.itmchooselist.listItem.itm_quantity_per_unit,
          'itm_sell_unit': this.itmchooselist.listItem.itm_sell_unit,
          'itm_order_unit': this.itmchooselist.listItem.itm_order_unit,
          'order_quantity': '',
          'ordAmount': ''
        });
      }else{
        this.alertInfoNotFoundItemAdd();
      }
    }
    this.srchItms = this.rcv002;
    this.itms = this.rcv002;
  }

  public scanAddItem() {
    let check = 0;
    this.pco00102Service.getItemListByBarcode(this.common.getBarcode).subscribe(res => {
      if (res[0] != null) {
        for (let i = 0; i < this.rcv002.length; i++) {
          if (this.rcv002[i].itm_id == res[0].itm_id) {
            if (this.rcv002[i].order_quantity == '') {
              this.rcv002[i].order_quantity = '0';
            }
            this.rcv002[i].order_quantity = (Number(this.rcv002[i].order_quantity) + 1).toString();
            check = 1;
            break;
          }
        }
        if (check == 0) {
          if(this.checkItemAdd() == true){
            this.rcv002.push({
              'itm_id': res[0].itm_id,
              'itm_code': res[0].itm_code,
              'itm_name': res[0].itm_name,
              'itm_capacity': res[0].itm_capacity,
              'itm_unit': res[0].itm_unit,
              'itm_quantity_per_unit': res[0].itm_quantity_per_unit,
              'itm_sell_unit': res[0].itm_sell_unit,
              'itm_order_unit': res[0].itm_order_unit,
              'order_quantity': '',
              'ordAmount': ''
            });
          }else{
            this.alertInfoNotFoundItemAdd();
          }
        }
        this.srchItms = this.rcv002;
        this.itms = this.rcv002;
        this.common.getBarcode = ""
      } else {
        this.AlertNotFoundItem();
      }
    })

  }

  public scanSearch() {
    this.checker = true;
    this.CheckerScanItem = true;
    this.router.navigate(['scanBarcode']);
  }

  checkSearch(data) {
    let check = false;
    if (this.common.getBarcode != "") {
      this.pco00102Service.getItemIdByBarcode(this.common.getBarcode).subscribe(res => {
        const val = res[0].itmid;
        this.checkVal = this.srchItms = this.itms.filter(itm =>
          itm.itm_id === val
        );
        this.common.getBarcode = "";
      })
      this.searchVal = this.common.getBarcode;
      check = true;
    }
    else if (data.target.value != "") {
      const val = data.target.value.toString();
      this.checkVal = this.srchItms = this.itms.filter(itm =>
        itm.itm_code.search(val) != -1 ||
        itm.itm_name.search(val) != -1 ||
        itm.itm_capacity.toString().search(val) != -1 ||
        itm.order_quantity.toString().search(val) != -1 ||
        itm.ordAmount.search(val) != -1 ||
        itm.itm_order_unit.search(val) != -1 ||
        itm.itm_quantity_per_unit.toString().search(val) != -1 ||
        itm.itm_sell_unit.toString().search(val) != -1 ||
        itm.itm_unit.toString().search(val) != -1
      );
      this.searchVal = val;
    } else {
      this.srchItms = this.itms;
      this.searchVal = ""
    }
    this.common.getBarcode = "";
  }

  public checkInsertStatus(insertStatus: number, checkSave: string = "save") {
    let checkerPoInput: boolean = this.checkRcvInfo(insertStatus);
    if (checkerPoInput && insertStatus == 1 && checkSave == "save") {
      this.insertRcv(insertStatus, checkSave);
      return false;
    } else if (checkerPoInput && insertStatus == 2 && checkSave == "confirm") {
      this.insertRcv(insertStatus, checkSave);
      return true;
    } else if (this.statusRcvInfo == 1) {
      this.alert_not_complete();
      return false;
    } else if (this.statusRcvInfo == 2) {
      this.alert_not_info();
      return false;
    }
  }

  public checkRcvInfo(checkSave) {
    if (checkSave == 2) {
      for (let i = 0; i < Object.keys(this.srchItms).length; i++) {
        if (this.srchItms[i].order_quantity == '' || this.srchItms[i].ordAmount == '' || this.srchItms[i].order_quantity == '' || this.srchItms[i].ordAmount == '') {
          this.statusRcvInfo = 1;
          return false;
        }
      }
      for (let i = 0; i < Object.keys(this.srchItms).length; i++) {
        if (String(this.srchItms[i].order_quantity).match(/[123456789]/g) == null || String(this.srchItms[i].ordAmount).match(/[123456789]/g) == null) {
          this.statusRcvInfo = 2;
          return false;
        }
      }
    } else {
      for (let i = 0; i < Object.keys(this.srchItms).length; i++) {
        if (String(this.srchItms[i].order_quantity).match(/[123456789]/g) == null || String(this.srchItms[i].ordAmount).match(/[123456789]/g) == null) {
          this.statusRcvInfo = 2;
          return false;
        }
      }
    }
    return true;
  }

  public async alert_not_complete() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-not-complete',
      backdropDismiss: false,
      header: 'กรอกข้อมูลไม่ครบถ้วน',
      subHeader: 'กรุณากรอกใหม่อีกครั้ง',
      buttons: [{ text: 'ตกลง' }],
    });

    await alert.present();
  }

  public async alert_not_info() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-not-complete',
      backdropDismiss: false,
      header: 'กรอกข้อมูลไม่ถูกต้อง',
      subHeader: 'กรุณากรอกใหม่อีกครั้ง',
      buttons: [{ text: 'ตกลง' }],
    });

    await alert.present();
  }

  public async alertInfoNotFoundItemAdd() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-not-complete',
      backdropDismiss: false,
      header: 'ไม่พบข้อมูลสินค้าในใบสั่งซื้อ',
      subHeader: 'กรุณาลองใหม่อีกครั้ง',
      buttons: [{ text: 'ตกลง' }],
    });

    await alert.present();
  }


  public insertRcv(insertStatus, checkSave) {
    if (Object.keys(this.srchItms).length != 0) {
      var rcvHead: RcvPutHeadRequest;
      var rcvDetail: RcvPutDetailRequest;
      rcvHead = {
        'ri_code': this.riCode,
        'ri_status': insertStatus,
        'ri_gen_user': this.riGenUser,
        'ri_create_by': localStorage.getItem("userName"),
        'ri_update_by': localStorage.getItem("userName"),
        'shopId': Number(localStorage.getItem("shopId")),
        'poId': this.poId
      };
      this.rcv002Service.putRcvHead(rcvHead).subscribe(res => {
        this.riId = res[0].rcvId;
        if (Object.keys(this.riDelItem).length != null) {
          for (let i = 0; i < Object.keys(this.riDelItem).length; i++) {
            this.rcv002Service.deleteRcvDetail(this.riDelItem[i]).subscribe(res => {
            });
          }
        }
        for (let i = 0; i < Object.keys(this.srchItms).length; i++) {
          rcvDetail = {
            'rid_itm_id': this.srchItms[i].itm_id,
            'rid_itm_order_unit': this.srchItms[i].itm_order_unit,
            'rid_receive_quantity_per_unit': this.srchItms[i].itm_quantity_per_unit,
            'rid_itm_sell_unit': this.srchItms[i].itm_sell_unit,
            'rid_receive_quantity': this.srchItms[i].order_quantity,
            'rid_purchase_price': this.srchItms[i].ordAmount,
            'rid_order_unit': this.srchItms[i].itm_order_unit,
            'rid_create_by': localStorage.getItem("userName"),
            'rid_update_by': localStorage.getItem("userName"),
            'ri_code': this.riCode,
            'shop_id': Number(localStorage.getItem("shopId"))
          }
          this.rcv002Service.rcvDetail(rcvDetail, checkSave).subscribe(res => {
          });
        }
        if (insertStatus == 1) {
          this.router.navigate(['pco001/pco00103', { riId: this.riId }]);
        } else if (insertStatus == 2) {
          this.router.navigate(['pco001/pco00103', { riId: '-1' }]);
        }
      });
    } else {
      this.alert_not_complete();
    }
  }

  public async presentAlert_succeed() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-save-success',
      backdropDismiss: false,
      header: 'บันทึกสำเร็จ!!',
      buttons: [{ text: 'ตกลง' }],
    });

    await alert.present();
  }

  public async AlertNotFoundItem() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-not-complete',
      backdropDismiss: true,
      subHeader: 'ไม่พบข้อมูลในระบบ',
      buttons: [
        {
          text: 'ตกลง'
        }
      ]
    });

    await alert.present();
  }
}


