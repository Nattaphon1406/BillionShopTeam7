import { Component, OnInit ,OnDestroy} from '@angular/core';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { Imt002Service } from '../service/itm002.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Itm001Service } from '../service/itm001.service';
import { ItmDefaultImg,barcodeDetail,itmInfo,itmBarcode,ItemsPutUpdateRequest,ItemsPutInsertRequest,itmId,itm002 } from '../model/ItemModel';


@Component({
  selector: 'app-itm002',
  templateUrl: './itm002.component.html',
  styleUrls: ['./itm002.component.scss'],
})
export class Itm002Component implements OnInit, OnDestroy {
  public header: string = null;
  private itm_id: Number = 0;
  public goodId: itm002;
  private shopId: any = Number(localStorage.getItem("shopId"));
  private userName: any = localStorage.getItem("userName");
  private path: any = "img.itemImg";
  public itmCode: string;
  public itemStatus: string = "";
  public base64Image: any;
  private product:boolean = true;
  public data: barcodeDetail[] = [];
  public delPrevious: barcodeDetail[] = [];
  private itm: itmInfo = {
    'itm_id': 0,
    'itm_code': "",
    'itm_name': "",
    'itm_price': "",
    'itm_capacity': "",
    'itm_unit': "",
    'itm_status': "",
    'itm_min_quantity': "",
    'itm_cost': 0,
    'itm_order_quantity': "",
    'itm_category': "",
    'itm_purchase_frequency': "",
    'itm_order_unit': "",
    'itm_sell_unit': "",
    'itm_img_path': "",
    'itm_create_by': "",
    'itm_create_date': "",
    'itm_update_by': "",
    'itm_update_date': "",
    'itm_sh_id': "",
  };

  constructor(
    private alertCtrl: AlertController,
    private actionsheetCtrl: ActionSheetController,
    private service: Imt002Service,
    private router: Router,
    private route: ActivatedRoute,
    private camera: Camera,
    private serviceItm001: Itm001Service
  ) {
    this.itm_id = parseInt(this.route.snapshot.paramMap.get('itm_id')) || 0;
  }
  ngOnInit() {
    if (this.itm_id !== 0) {
      this.header = "อัปเดตข้อมูลสินค้า"
      this.getDefaultImg();
      this.getItemById();
    } else {
      this.header = "เพิ่มข้อมูลสินค้า"
      this.getItemCode();
      if(this.itm.itm_img_path == ""){
        this.getDefaultImg();
      }
    }
  }
  ngOnDestroy(){
    this.service.deleteBarcode = null;
    this.service.AddBarcode = null;
    this.itm.itm_img_path = "";
  }

  getDefaultImg(){
    let imgDefault:ItmDefaultImg;
    this.serviceItm001.getDefault().subscribe(res =>{
      imgDefault = res as ItmDefaultImg;
      this.itm.itm_img_path = imgDefault['itemImg'];
    });
  }

  getItemCode() {
    this.service.getItemCode().subscribe(res => {
      this.itm.itm_code = res[0].itmCode;
    });
  }
public refBarcode:any;
  getItemById() {
    this.service.getItemById(this.itm_id).subscribe(res => {
      this.itm = res[0]
      if(this.itm.itm_status == "1"){
        this.product = true;
      }else{
        this.product = false;
      }
    })
    
    this.service.getBarcodeByItemId(this.itm_id).subscribe(res => {
      this.refBarcode = res;
      let test:barcodeDetail[] = [];
      let j=1
      for(let i=0;i<this.refBarcode.length;i++){
        if(this.refBarcode[i].barcodeType == '1'){
          test.push({
            key: j++,
            option: "fromDB",
            type: "1",
            barcode: this.refBarcode[i].dataBarcode
          })
        }else{
          test.push({
            key: j++,
            option: "fromDB",
            type: "2",
            barcode: this.refBarcode[i].dataBarcode
          })
        }
      }
      j=0;
      this.data = test;
      this.service.AddBarcode = this.data;
      this.service.deleteBarcode = this.delPrevious;
    })

  }


  changeState() {
    this.alert_state();
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

  public async alert_not_number() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-not-complete',
      backdropDismiss: false,
      header: 'คุณไม่ได้กรอกเป็นตัวเลข',
      subHeader: 'กรุณากรอกใหม่อีกครั้ง',
      buttons: [{ text: 'ตกลง' }],
    });

    await alert.present();
  }

  public async alert_state() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      header: 'ต้องการเปลี่ยนสถานะหรือไม่',
      buttons: [
        {
          text: 'ไม่ใช่',
          handler: () => {
            this.product = this.product;
          }
        },
        {
          text: 'ใช่',
          handler: () => {
            this.product = !this.product;
          }
        }
      ]
    });

    await alert.present();
  }

  public async alert_not_string() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-not-string',
      backdropDismiss: false,
      header: 'คุณกรอกชื่อสินค้าเป็นตัวเลข',
      message: 'กรุณากรอกใหม่อีกครั้ง',
      buttons: [{ text: 'ตกลง' }],
    });

    await alert.present();
  }

  public async AlertConfirmAddItem() {
    this.data = this.service.AddBarcode;
    this.delPrevious = this.service.deleteBarcode;
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      backdropDismiss: true,
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
            if (this.itm.itm_name != ""
              && parseInt(this.itm.itm_capacity) != 0
              && this.itm.itm_unit != ""
              && parseInt(this.itm.itm_price) != 0
              && parseInt(this.itm.itm_min_quantity) != 0
              && this.itm.itm_sell_unit != ""
              && parseInt(this.itm.itm_order_quantity) != 0
              && this.itm.itm_order_unit != ""
              && parseInt(this.itm.itm_purchase_frequency) != 0
              && ( (Object.keys(this.data).length != 0))
            ) {
              if (this.itm.itm_name.match(/[1234567890]/g) != null) {
                this.alert_not_string();
              } else if (
                !Number.isInteger(parseInt(this.itm.itm_capacity)) ||
                !Number.isInteger(parseInt(this.itm.itm_price)) ||
                !Number.isInteger(parseInt(this.itm.itm_min_quantity)) ||
                !Number.isInteger(parseInt(this.itm.itm_order_quantity)) ||
                !Number.isInteger(parseInt(this.itm.itm_purchase_frequency))
              ) {
                this.alert_not_number();
              } else {
                if (this.itm.itm_id === 0) {
                  let itemInsert:ItemsPutInsertRequest;
                  let test:ItemsPutInsertRequest;
                  itemInsert = {
                    'itm_code':this.itm.itm_code,
                    'itm_name':this.itm.itm_name,
                    'itm_capacity':parseFloat(this.itm.itm_capacity),
                    'itm_price':parseFloat(this.itm.itm_price),
                    'itm_cost':0,
                    'itm_min_quantity':parseInt(this.itm.itm_min_quantity),
                    'itm_order_quantity':parseInt(this.itm.itm_order_quantity),
                    'itm_purchase_frequency':parseInt(this.itm.itm_purchase_frequency),
                    'itm_unit':this.itm.itm_unit,
                    'itm_status':this.product ? "1" : "2",
                    'itm_order_unit':this.itm.itm_order_unit,
                    'itm_sell_unit': this.itm.itm_sell_unit,
                    'itm_img_path':this.itm.itm_img_path,
                    'itm_update_by': this.userName,
                    'itm_create_by': this.userName,
                    'itm_sh_id':this.shopId
                  };
                  let itemId:itmId;
                  this.service.putItemData(itemInsert).subscribe(res => {
                      let itemCode = this.itm.itm_code.toString();
                      let ItemBarcode : itmBarcode;
                      itemId = res[0] as itmId;
                      for(let i=0;i<this.data.length;i++){
                      ItemBarcode = {
                        "barcodeType": this.data[i]['type'],
                        "dataBarcode": this.data[i]['barcode']
                      };
                      this.service.putItemBarcode(itemCode,localStorage.getItem('userName').toString(),ItemBarcode).subscribe(res => {
                        
                      });
                    }
                    this.router.navigate(['itm002/success', {text : 'add',itemId: itemId.itemId}]);
                    });


                } else {
                  // put body
                  let itemUpdate:ItemsPutUpdateRequest;
                  itemUpdate = {
                    'itm_id':this.itm.itm_id,
                    'itm_name':this.itm.itm_name,
                    'itm_capacity':parseFloat(this.itm.itm_capacity),
                    'itm_price':parseFloat(this.itm.itm_price),
                    'itm_cost':this.itm.itm_cost,
                    'itm_min_quantity':parseInt(this.itm.itm_min_quantity),
                    'itm_order_quantity':parseInt(this.itm.itm_order_quantity),
                    'itm_purchase_frequency':parseInt(this.itm.itm_purchase_frequency),
                    'itm_unit':this.itm.itm_unit,
                    'itm_status':this.product ? "1" : "2",
                    'itm_order_unit':this.itm.itm_order_unit,
                    'itm_sell_unit': this.itm.itm_sell_unit,
                    'itm_img_path':this.itm.itm_img_path,
                    'itm_update_by': this.userName
                  };
                  this.service.updateItemData(itemUpdate).subscribe(res => {
                      
                    });

                    let ItemBarcode : itmBarcode;
                    for(let i=0;i<this.delPrevious.length;i++){
                      this.service.deleteItemBarcode(this.itm.itm_code,this.delPrevious[i]['barcode']).subscribe(res => {

                      });
                    }
                    for(let i=0;i<this.data.length;i++){
                      if(this.data[i]['option'] == "add" || this.data[i]['option'] == "addBSS"){
                        ItemBarcode = {
                          "barcodeType": this.data[i]['type'],
                          "dataBarcode": this.data[i]['barcode']
                        };
                        this.service.putItemBarcode(this.itm.itm_code,localStorage.getItem('userName').toString(),ItemBarcode).subscribe(res => {

                        });
                      }
                    }

                    this.router.navigate(['itm002/success', { text: 'edit',itemId:this.itm.itm_id }]);
                }
              }
            } else {
              this.alert_not_complete();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  clickBarcode(){
    this.service.itemCode = this.itm.itm_code;
    this.service.itemName =  this.itm.itm_name;
    this.router.navigate(['itm002/addBarcode']);
  }


  openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true
    };
    this.camera.getPicture(options).then((imageData) => {

      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.itm.itm_img_path = this.base64Image;
      
    }, (err) => {
    });
  }

  openGallery(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      correctOrientation: true
    };
    this.camera.getPicture(options).then((imageData) => {

      this.base64Image  = 'data:image/jpeg;base64,' + imageData;
      this.itm.itm_img_path =  this.base64Image ;
    }, (err) => {
      // Handle error
    })
  }

  async presentActionSheet() {
    const actionSheet = await this.actionsheetCtrl.create({
      buttons: [
        {
          text: 'ถ่ายรูปภาพ',
          role: 'destructive',
          handler:() =>{
            this.openCamera();
          }
        }, {
          text: 'เลือกรูปภาพ',
          role: 'destructive',
          
          handler:() =>{
            this.openGallery();
          }
        },
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'cancelActionsheet',
          handler:() =>{

          }
          
        },
      ],
      cssClass: 'buttonActionsheet',
      animated: true,
      backdropDismiss: true,
      keyboardClose: true,
      mode: 'md',

    });
    await actionSheet.present();
  }

  public backPage(){
    this.router.navigate(['itm001']);
  }

  public async clickcancel() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      header: 'ต้องการยกเลิกข้อมูลหรือไม่',
      buttons: [
        {
          text: 'ไม่ใช่',
          handler: () => {

          }
        },
        {
          text: 'ใช่',
          handler: () => {
            this.router.navigate(['itm001']);
          }
        }
      ]
    });

    await alert.present();
  }
}

