import { Component, DoCheck, OnInit } from '@angular/core';
import { PcoPutHeadRequest } from '../model/pcoPutHeadRequest';
import { Pco00102Service } from '../../service/pco00102.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { PcoPutDetailRequest } from '../model/pcoPutDetailRequest';
import { Pco00101Service } from '../../service/pco00101.service';
import { PcoDeleteDetailRequest } from '../model/pcoDeleteDetailRequest';
import { itemList } from '../../../shared/component/itm-choose-list/item-list-model/itemList';
import { ItmChooseListService } from '../../../shared/component/itm-choose-list/service/itm-choose-list.service';
import { PcoDetailItemList } from '../model/PcoDetailItemList';
import { CommonService } from '../../../shared/services/common/common.service';


@Component({
  selector: 'app-pco00102',
  templateUrl: './pco00102.component.html',
  styleUrls: ['./pco00102.component.scss'],
})
export class Pco00102Component implements OnInit, DoCheck {
  public itms: any;
  public srchItms: any;
  public poCode: string;
  public poId: number;
  private statusPO: string = "";
  poGenUser: string;
  poStatus: string;
  poDate: string;
  checkNotPO: any;
  type: any;
  poDelItem: PcoDeleteDetailRequest[] = [];
  itemList: itemList;
  statusPoInfo: number = null;
  public checkVal: any;



  constructor(
    private pco00101Service: Pco00101Service,
    private pco00102Service: Pco00102Service,
    private itmchooselist: ItmChooseListService,
    private alertCtrl: AlertController,
    private router: Router,
    private route: ActivatedRoute,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.statusPO = this.pco00102Service.getStatusPO();
    this.poId = Number(this.route.snapshot.paramMap.get('poId'));
    if (this.poId != 0) {
      this.pco00102Service.getPoHead(this.poId).subscribe(ref => {
        this.poCode = ref[0].poCode;
        this.poGenUser = ref[0].poGenUser;
        this.poStatus = ref[0].poStatus;
        this.poDate = ref[0].poDate;
        this.pco00101Service.getPoDetailDataByPoId(this.poId).subscribe(res => {
          for (let i = 0; i < Object.keys(res).length; i++) {
            this.itemAdd.push({
              'itm_capacity': res[i].itm_capacity,
              'itm_id': res[i].itm_id,
              'itm_code': res[i].itm_code,
              'itm_name': res[i].itm_name,
              'itm_unit': res[i].itm_unit,
              'itm_quantity_per_unit': res[i].itm_quantity_per_unit,
              'itm_order_quantity': res[i].itm_order_quantity.toString(),
              'itm_order_unit': res[i].itm_order_unit,
              'itm_sell_unit': res[i].itm_sell_unit,
              'itm_order_Pack': 0
            });
          }
          this.itms = this.itemAdd;
          this.srchItms = this.itemAdd;
        });
      })
    } else {
      this.genPoHead();
      if ((this.statusPO == "Auto" || this.statusPO == "") && this.poId == 0) {
        this.statusPO = "Auto";
        this.genPOAuto();
        this.pco00102Service.setStatusPO('')
      }
    }

  }

  genPoHead() {
    this.pco00102Service.genPoHead().subscribe(res => {
      this.poCode = res.poCode;
      this.poDate = res.poDate;
      this.poStatus = "อยู่ระหว่างดำเนินการ";
      this.poGenUser = localStorage.getItem("nameUser");
    });
  }

  genPOAuto() {
    this.pco00102Service.genPOAuto(localStorage.getItem("shopId")).subscribe(res => {
      let changeData: string = '0';
      for (let i = 0; i < Object.keys(res).length; i++) {
        changeData = res[i].itm_order_quantity;
        if (changeData == null) {
          changeData = '';
        }
        this.itemAdd.push({
          'itm_capacity': res[i].itm_capacity,
          'itm_id': res[i].itm_id,
          'itm_code': res[i].itm_code,
          'itm_name': res[i].itm_name,
          'itm_unit': res[i].itm_unit,
          'itm_quantity_per_unit': res[i].itm_quantity_per_unit,
          'itm_order_quantity': changeData,
          'itm_order_unit': res[i].itm_order_unit,
          'itm_sell_unit': res[i].itm_sell_unit,
          'itm_order_Pack': res[i].itm_order_Pack
        });
      }
      this.itms = this.itemAdd;
      this.srchItms = this.itemAdd;
    });
  }

  public async btnConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      subHeader: 'ต้องการยืนยันข้อมูลหรือไม่',
      buttons: [
        {
          text: 'ไม่ใช่',
          handler: () => {
          }
        },
        {
          text: 'ใช่',
          handler: () => {
            this.checkInsertStatus(3);
          }
        }
      ]
    });

    await alert.present();
  }
  public async btnCancel() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      subHeader: 'ต้องการยกเลิกข้อมูลหรือไม่',
      buttons: [
        {
          text: 'ไม่ใช่',
          handler: () => {
          }
        },
        {
          text: 'ใช่',
          handler: () => {
            this.checkInsertStatus(2);


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

  public remove(id) {
    this.poDelItem.push({
      'po_code': this.poCode,
      'pod_itm_id': id
    });
    this.itemAdd.splice(this.itemAdd.findIndex(ref => ref.itm_id == id), 1);
    this.srchItms = this.itemAdd;
    this.itms = this.itemAdd;
  }

  public removeAll() {
    this.srchItms = this.srchItms.forEach(item => {
      this.poDelItem.push({
        po_code: this.poCode,
        pod_itm_id: item.itm_id
      })
    });
    this.itemAdd.splice(0);
    this.srchItms = this.itemAdd;
    this.itms = this.itemAdd;
  }

  public checkInsertStatus(insertStatus: number) {
    let checkerPoInput: boolean = this.checkPoInfo();
    if (checkerPoInput && insertStatus == 1) {
      this.insertPO(insertStatus);
      return false;
    } else if (checkerPoInput && insertStatus == 2) {
      this.insertPO(4);
      return true;
    } else if (checkerPoInput && insertStatus == 3) {
      this.insertPO(2);
      return true;
    } else if (this.statusPoInfo == 1) {
      this.alert_not_complete();
      return false;
    } else if (this.statusPoInfo == 2) {
      this.alert_not_info();
      return false;
    }
  }

  public checkSrchitem() {
    let num: number = 0;
    if (this.srchItms == null) {
      num = 0;
    } else {
      num = Object.keys(this.srchItms).length;
    }
    return num;
  }

  public checkPoInfo() {
    for (let i = 0; i < this.checkSrchitem(); i++) {
      if (this.srchItms[i].itm_order_quantity == null || this.srchItms[i].itm_order_quantity == '') {
        this.statusPoInfo = 1;
        return false;
      }
      if (String(this.srchItms[i].itm_order_quantity).match(/[123456789]/g) == null) {
        this.statusPoInfo = 2;
        return false;
      }
    }
    return true;
  }

  public insertPO(insertStatus) {

    if (this.checkSrchitem() > 0) {
      var poHead: PcoPutHeadRequest;
      var poDetail: PcoPutDetailRequest;
      poHead = {
        'poCode': this.poCode,
        'poStatus': insertStatus,
        'poGenUser': this.poGenUser,
        'poCreateBy': localStorage.getItem("userName"),
        'poUpdateBy': localStorage.getItem("userName"),
        'shopId': Number(localStorage.getItem("shopId"))
      };
      this.pco00102Service.putPoHead(poHead).subscribe(res => {
        this.poId = res[0].poId;
        if (Object.keys(this.poDelItem).length != null) {
          for (let i = 0; i < Object.keys(this.poDelItem).length; i++) {
            this.pco00102Service.deletePoDetail(this.poDelItem[i]).subscribe(res => {
            });
          }
        }
        for (let i = 0; i < Object.keys(this.srchItms).length; i++) {
          poDetail = {
            'pod_order_quantity_per_unit': this.srchItms[i].itm_quantity_per_unit,
            'pod_order_quantity': this.srchItms[i].itm_order_quantity,
            'itm_order_unit': this.srchItms[i].itm_order_unit,
            'itm_unit': this.srchItms[i].itm_sell_unit,
            'pod_itm_id': this.srchItms[i].itm_id,
            'pod_Create_By': localStorage.getItem("userName"),
            'pod_Update_By': localStorage.getItem("userName"),
            'po_code': this.poCode,
            'shop_id': Number(localStorage.getItem("shopId"))
          }

          this.pco00102Service.poDetail(poDetail).subscribe(res => {
          });

        }
        if (insertStatus == 1) {
          this.router.navigate(['pco001/pco00103', { poId: this.poId }]);
        } else if (insertStatus == 2) {
          this.router.navigate(['pco001/pco00103', { poId: '-1' }]);
        } else if (insertStatus == 4) {
          this.router.navigate(['pco001']);
        }
      });
    } else {
      this.alert_not_complete();
    }
  }

  public searchVal = "";

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
    } else if (data.target.value != "" && check == false) {
      const val = data.target.value.toString();
      this.checkVal = this.srchItms = this.itms.filter(itm =>
        itm.itm_code.search(val) != -1 ||
        itm.itm_name.search(val) != -1 ||
        itm.itm_capacity.toString().search(val) != -1 ||
        itm.itm_order_quantity.toString().search(val) != -1 ||
        itm.itm_order_unit.search(val) != -1 ||
        itm.itm_quantity_per_unit.toString().search(val) != -1 ||
        itm.itm_sell_unit.search(val) != -1 ||
        itm.itm_unit.search(val) != -1
      );
      this.searchVal = val;
    } else {
      this.srchItms = this.itms;
      this.searchVal = ""
    }
    this.common.getBarcode = "";
  }

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

  public checker: boolean = false;
  public CheckerScanAddItem = false;
  public CheckerScanItem = false;
  public checkerChoose = false;
  public itemAdd: PcoDetailItemList[] = [];

  ionViewWillEnter() {
    this.searchVal = "";
    if (this.checker == true) {
      if (this.checkerChoose == true) {
        this.addItem();
        this.checkerChoose = false;
      }
      this.checker = false;
    }


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

  public scanSearch() {
    this.checker = true;
    this.CheckerScanItem = true;
    this.router.navigate(['scanBarcode']);
  }

  public addItem() {
    let check = 0;
    for (let i = 0; i < this.itemAdd.length; i++) {
      if (this.itemAdd[i].itm_id == this.itmchooselist.listItem.itm_id) {
        if (this.itemAdd[i].itm_order_quantity == '') {
          this.itemAdd[i].itm_order_quantity = '0';
        }
        this.itemAdd[i].itm_order_quantity = (Number(this.itemAdd[i].itm_order_quantity) + 1).toString();
        check = 1;
        break;
      }
    }
    if (check == 0) {
      this.itemAdd.push({
        'itm_capacity': this.itmchooselist.listItem.itm_capacity,
        'itm_id': this.itmchooselist.listItem.itm_id,
        'itm_code': this.itmchooselist.listItem.itm_code,
        'itm_name': this.itmchooselist.listItem.itm_name,
        'itm_unit': this.itmchooselist.listItem.itm_unit,
        'itm_quantity_per_unit': this.itmchooselist.listItem.itm_quantity_per_unit,
        'itm_order_quantity': '',
        'itm_order_unit': this.itmchooselist.listItem.itm_order_unit,
        'itm_sell_unit': this.itmchooselist.listItem.itm_sell_unit,
        'itm_order_Pack': 0
      });
    }
    this.srchItms = this.itemAdd;
    this.itms = this.itemAdd;
  }

  public scanAddItem() {

    let check = 0;
    this.pco00102Service.getItemListByBarcode(this.common.getBarcode).subscribe(res => {
      if (res[0] != null) {
        for (let i = 0; i < this.itemAdd.length; i++) {
          if (this.itemAdd[i].itm_id == res[0].itm_id) {
            if (this.itemAdd[i].itm_order_quantity == '') {
              this.itemAdd[i].itm_order_quantity = '0';
            }
            this.itemAdd[i].itm_order_quantity = (Number(this.itemAdd[i].itm_order_quantity) + 1).toString();
            check = 1;
            break;
          }
        }
        if (check == 0) {
          this.itemAdd.push({
            'itm_capacity': res[0].itm_capacity,
            'itm_id': res[0].itm_id,
            'itm_code': res[0].itm_code,
            'itm_name': res[0].itm_name,
            'itm_unit': res[0].itm_unit,
            'itm_quantity_per_unit': res[0].itm_quantity_per_unit,
            'itm_order_quantity': '',
            'itm_order_unit': res[0].itm_order_unit,
            'itm_sell_unit': res[0].itm_sell_unit,
            'itm_order_Pack': 0
          });
        }
        this.srchItms = this.itemAdd;
        this.itms = this.itemAdd;
        this.common.getBarcode = ""
      } else {
        this.AlertNotFoundItem();
      }
    })

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

