import { DatePipe } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import { ItmChooseListService } from 'src/app/shared/component/itm-choose-list/service/itm-choose-list.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { ajs00102, delAjsItem, stockAdjustDetailRequest, stockAdjustHeaderRequest } from '../../model/ajs00102';
import { Pco00102Service } from 'src/app/pco/service/pco00102.service';
import { Pco00102Component } from 'src/app/pco/pco001/pco00102/pco00102.component';
import { Ajs00102Service } from 'src/app/stk/service/ajs00102.service';

@Component({
  selector: 'app-ajs00102',
  templateUrl: './ajs00102.component.html',
  styleUrls: ['./ajs00102.component.scss'],
})
export class Ajs00102Component implements OnInit, DoCheck {

  public itms: any;
  public srchItms: any;
  public reason: any;
  public saCode = "";
  public saDate;
  public saGenUser = "";
  public saReason: string = ''; 
  public saNote: string; 
  public itemAdd: ajs00102[] = [];
  public DelItem: delAjsItem[] = [];
  constructor(
    private pco00102Service: Pco00102Service,
    private datepipe: DatePipe,
    private itmchooselist: ItmChooseListService,
    private alertCtrl: AlertController,
    private router: Router,
    private common: CommonService,
    private pco00102Component: Pco00102Component,
    private ajs00102Service: Ajs00102Service
  ) { }

  ngOnInit() {
    this.getReason();
    this.genHeaderAdjustStock();
  }

  private getReason() {
    this.ajs00102Service.getReasonAdjustStock().subscribe(res => {
      this.reason = res;
    })
  }

  genHeaderAdjustStock() {
    this.ajs00102Service.getCodeAdjustStock().subscribe(res => {
      this.saCode = res[0].saCode;
      this.saDate = this.datepipe.transform(Date(), 'dd/MM/yyyy');
      this.saGenUser = localStorage.getItem("nameUser");
    })

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
  public searchVal = "";

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

  public checkVal: any;

  public checkSrchitem() {
    let num: number = 0;
    if (this.srchItms == null) {
      num = 0;
    } else {
      num = Object.keys(this.srchItms).length;
    }
    return num;
  }

  public statusInfo: number =0;
  public checkInfo() {
    for (let i = 0; i < this.checkSrchitem(); i++) {
      if (this.srchItms[i].sad_quantity == null || this.srchItms[i].sad_quantity == '' || this.saReason == '') {
        this.statusInfo = 1;
        return false;
      }
      else if (String(this.srchItms[i].sad_quantity).match(/[123456789]/g) == null || (this.srchItms[i].sad_quantity*-1) > this.srchItms[i].itm_stock) {
        this.statusInfo = 2;
        return false;
      }
    }
    return true;
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
    } else if (data.target.value != "" && check == false) {
      const val = data.target.value.toString();
      this.checkVal = this.srchItms = this.itms.filter(itm =>
        itm.itm_code.search(val) != -1 ||
        itm.itm_name.search(val) != -1 ||
        itm.sad_quantity.search(val) != -1 ||
        itm.itm_sell_unit.search(val) != -1 ||
        itm.itm_unit.search(val) != -1 ||
        itm.itm_capacity.toString().search(val) != -1
      );
      this.searchVal = val;
    } else {
      this.srchItms = this.itms;
      this.searchVal = ""
    }
    this.common.getBarcode = "";
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
        if (this.itemAdd[i].sad_quantity == '') {
          this.itemAdd[i].sad_quantity = '0';
        }
        this.itemAdd[i].sad_quantity = (Number(this.itemAdd[i].sad_quantity) + 1).toString();
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
        'itm_sell_unit': this.itmchooselist.listItem.itm_sell_unit,
        'sad_quantity': '',
        'itm_stock': this.itmchooselist.listItem.itm_stock
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
            if (this.itemAdd[i].sad_quantity == '') {
              this.itemAdd[i].sad_quantity = '0';
            }
            this.itemAdd[i].sad_quantity = (Number(this.itemAdd[i].sad_quantity) + 1).toString();
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
            'itm_sell_unit': res[0].itm_sell_unit,
            'sad_quantity': '',
            'itm_stock': res[0].itm_stock
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

  public async deleteItem(del: string = 'delAll') {
    var subHeadAlert = "ต้องการลบรายการทั้งหมดหรือไม่";
    if (del != 'delAll') {
      subHeadAlert = "ต้องการลบรายการนี้หรือไม่"
    }
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      subHeader: subHeadAlert,
      buttons: [
        {
          text: 'ไม่ใช่'
        },
        {
          text: 'ใช่',
          handler: () => {
            if (del == 'delAll') {
              this.removeAll();
            } else {
              this.remove(del);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  public remove(id) {
    this.DelItem.push({
      itm_id: id,
      ajs_code: this.saCode
    });
    this.itemAdd.splice(this.itemAdd.findIndex(ref => ref.itm_id == id), 1);
    this.srchItms = this.itemAdd;
    this.itms = this.itemAdd;
  }

  public removeAll() {
    this.srchItms = this.srchItms.forEach(item => {
      this.DelItem.push({
        ajs_code: this.saCode,
        itm_id: item.itm_id
      })
    });
    this.itemAdd.splice(0);
    this.srchItms = this.itemAdd;
    this.itms = this.itemAdd;
  }

  public async AlertConfirm() {

    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      subHeader: "ต้องการยืนยันข้อมูลหรือไม่",
      buttons: [
        {
          text: 'ไม่ใช่'
        },
        {
          text: 'ใช่',
          handler: () => {
            this.checkBtnConfrim();
          }
        }
      ]
    });
    await alert.present();
  }

  public checkBtnConfrim() {
    if (this.itemAdd.length >= 1) {
      if (this.checkInfo()) {
        this.insertStockAdjust();
        
      } else {

        if (this.statusInfo == 1) {
          this.pco00102Component.alert_not_complete();
        } else if (this.statusInfo == 2) {
          this.pco00102Component.alert_not_info();
        }
      }

    } else {
      this.pco00102Component.alert_not_complete();
    }
  }

  public insertStockAdjust(){

    var insertHeader:stockAdjustHeaderRequest;
    insertHeader= {
      "saGenUser": this.saGenUser,
      "saReason": this.saReason,
      "saNote": this.saNote,
      "saUserCreate": localStorage.getItem('userName'),
      "saUserUpdate": localStorage.getItem('userName')
    };
    this.ajs00102Service.InsertAdjustStockHeader(insertHeader,Number(localStorage.getItem('shopId'))).subscribe(ref=> {
      var itemInsert:stockAdjustDetailRequest;
      var i:number;
      var saId:number = ref[0].saId;
      for(i=0;i<this.itemAdd.length;i++){
        itemInsert = {
          "saGenUser": this.saGenUser,
          "saQuantity": Number(this.itemAdd[i].sad_quantity),
          "itmId": this.itemAdd[i].itm_id
        }
        this.ajs00102Service.InsertAdjustStockDetail(itemInsert,saId).subscribe(res=> {
          if(i == (this.itemAdd.length)){
            this.router.navigate(['ajs001/ajs00103']);
          }
        });
      }
    });
  }

}

