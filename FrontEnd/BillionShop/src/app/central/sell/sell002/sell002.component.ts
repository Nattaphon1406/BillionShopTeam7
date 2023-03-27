import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { GestureConfig } from '@ionic/angular';
import { Router } from '@angular/router';
import { SellService } from '../sell.service';
import { sellBucket } from '../sell-model/sellBucket';
import { sell001 } from '../sell-model/sell001';

@Component({
  selector: 'app-sell002',
  templateUrl: './sell002.component.html',
  styleUrls: ['./sell002.component.scss'],
})
export class Sell002Component implements AfterViewInit, OnInit, OnDestroy {

  constructor(private alertController: AlertController,
    private router: Router,
    private element: ElementRef,
    private render: Renderer2,
    private sellService: SellService) {
    this.startScanner();
  }

  amount: any;
  public item: sell001;
  public srchItem: any;
  public showListItem = true;
  public img: any;
  public base64Image: any;
  public itemInBucket: sellBucket[] = [];
  public shopId = Number(localStorage.getItem("shopId"));
  public alertNumberOfItem:number = 0;


  ngOnInit() {
    BarcodeScanner.prepare();
    this.getItemAllByShopId();
    this.checkNumberOfItem();
  }

  async ngAfterViewInit() {
    const options: GestureConfig = {
      el: this.element.nativeElement,
      direction: "y",
      gestureName: 'slide',
      onStart: () => {
        this.render.setStyle(this.element.nativeElement, "transition", "none");
      },
      onMove: ev => {
        if (ev.deltaY < 0) {
          this.render.setStyle(this.element.nativeElement, "transform", `translateY(-400%)`);
        }
      }
    };

  }

  ngOnDestroy() {
    BarcodeScanner.stopScan();
    
  }
  result = null;
  test: any;
  checkNumberOfItem(){
    this.alertNumberOfItem = Object.keys(this.itemInBucket).length;
  }
  async startScanner() {

    const allowed = await this.checkPermission();
    BarcodeScanner.hideBackground();
    if (allowed) {
      const result = await BarcodeScanner.startScan();
      this.test = result.content;
      
      if (result.hasContent) {
        let Itm: sell001;

        this.sellService.findItemByData(this.test).subscribe(res => {
          if(Object.keys(res).length == 0){
            this.AlertNotFoundItem();
          }else{
            Itm = res[0];
            let check = 0;
            for (let i = 0; i < this.itemInBucket.length; i++) {
              if (Itm.id == this.itemInBucket[i].id) {
                check = 1;
                if(this.itemInBucket[i].stockItem > this.itemInBucket[i].numberItem){
                  this.itemInBucket[i].numberItem += 1;
                }
                
              }
            }
            if (check == 0) {
              
              this.itemInBucket.push({
                'id':Itm.id,
                'itemcode':Itm.itemcode,
                'itemname':Itm.itemname,
                'img':Itm.img,
                'itemcapacity':Itm.itemcapacity,
                'itemunit':Itm.itemunit,
                'itemprice':Itm.itemprice.toFixed(2),
                'numberItem':1,
                'stockItem':Itm.stockItem
              });
              this.checkNumberOfItem();
            }
            this.sellService.Bucket = this.itemInBucket;
          }
          this.getItemAllByShopId();
        });

      }
    }
    this.startScanner();
  }

  public async AlertNotFoundItem() {
    const alert = await this.alertController.create({
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

  stopScanner() {
    BarcodeScanner.stopScan();
  }

  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        const alert = await this.alertController.create({
          header: 'No permission',
          message: 'Please allow camera access in your setting',
          buttons: [{
            text: 'ไม่ใช่',
            role: 'cancel'
          }, {
            text: 'ตั้งค่า',
            handler: () => {
              BarcodeScanner.openAppSettings();
              resolve(false);
            }
          }]
        });
        await alert.present();
      } else {
        resolve(false);
      }
    });
  }

  checkDataItem() {

    if (Object.keys(this.item).length == 0) {
      this.showListItem = false;
    } else {
      this.showListItem = true;
    }
  }

  public async AlertDeleteProduct(itmId) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      backdropDismiss: true,
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
            let i = this.itemInBucket.indexOf(this.itemInBucket.find(e => itmId == e.id));
            this.itemInBucket.splice(i,1);
            this.sellService.Bucket = this.itemInBucket;
            this.checkNumberOfItem();
          }
        }
      ]
    });

    await alert.present();
  }

  getItemAllByShopId() {
    this.itemInBucket = this.sellService.Bucket;
  }


  clickEditnumber(itemId: number, itemOption: string) {
    let num = this.itemInBucket.indexOf(this.itemInBucket.find(e => e.id == itemId));
    if (itemOption == 'add' && this.itemInBucket[num].numberItem < this.itemInBucket[num].stockItem) {
      this.itemInBucket[num].numberItem += 1;
    } else if (itemOption == 'remove') {
      if (this.itemInBucket[num].numberItem > 1) {
        this.itemInBucket[num].numberItem -= 1;
      }
    }
    this.sellService.Bucket = this.itemInBucket;
  }
  goPageBucket(){
    this.router.navigate(['bucket']);
  }


}
