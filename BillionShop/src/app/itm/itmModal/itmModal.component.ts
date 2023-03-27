import { Component, OnInit,Input, DoCheck } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Imt002Service } from '../service/itm002.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { barcodeDetail } from '../model/ItemModel';

@Component({
  selector: 'app-item-modal',
  templateUrl: './itmModal.component.html',
  styleUrls: ['./itmModal.component.scss'],
})

export class itmModal implements OnInit,DoCheck {
  private itmBar: barcodeDetail[] = [];
  private DelBar: barcodeDetail[] = [];
  private item: barcodeDetail;
  private index: number = 0;
  public name:String;
  public goodId:String;
  private numberOfBarcode:number =0;
  private checker:boolean = false;
  
  @Input("previous") previous;
  @Input("delPrevious") delPrevious;

  constructor(
    private alertCtrl: AlertController,
    private service:Imt002Service,
    private common: CommonService
  ) { }

  ngOnInit() {
    if(this.service.AddBarcode != null){
      this.itmBar = this.service.AddBarcode;
      this.index = this.itmBar.length;
    }
    if(this.service.deleteBarcode != null){
      this.DelBar = this.service.deleteBarcode;
    }
     this.checkNumberOfBar();
     this.name = this.service.itemName;
     this.goodId = this.service.itemCode;
  }

  ionViewWillEnter(){
    if(this.checker == true){
      this.scan(this.service.keyitemBarcode)
      this.checker = false;
    }
  }

  ngDoCheck(): void {
      
  }

  checkNumberOfBar(){
    this.numberOfBarcode = Object.keys(this.itmBar).length;
  }

  backpage(){
    let max:number = this.itmBar.length;
    let check:number;
    for(let i=0;i<max;i++){
      check = this.itmBar.findIndex(blank => blank.barcode == "");
      if(check != -1){
        this.itmBar.splice(check,1);
      }
      if(this.itmBar[i].barcode.length != 13){
        this.DelBar.push({key:this.itmBar[i].key,option:"del",barcode:this.itmBar[i].barcode,type:this.itmBar[i].type});
        this.itmBar.splice(i,1);
      }
    }
    let j=1;
    for(let i=0;i<this.itmBar.length;i++){
      this.itmBar[i].key = j++;
    }

    this.service.AddBarcode = this.itmBar;
    this.service.deleteBarcode = this.DelBar;
  }

  public bar:any;

  createBarCode(type: string) {    
    if (type == "BSS") {
      this.itmBar.push({
        key: this.index +1,
        option: "addBSS",
        type: "2",
        barcode: ""
      })
      let pullBarcodeBSS:String;
      this.service.getBarcodeBSS().subscribe(res => {
        this.bar = res[0];
        let barcodelength = Object.keys(this.bar).length;
        let num:number = 1;
        if(Object.keys(res).length != 0){
          pullBarcodeBSS = this.bar.dataBarcode;
          let itmBarLength = this.itmBar.length;
          for(let i=0;i<itmBarLength;i++){
            if((Number(pullBarcodeBSS.substring(0,12)) <= Number(this.itmBar[i].barcode.substring(0,12))) && this.itmBar[i].type == '2'){
                num = (Number(this.itmBar[i].barcode.substring(0,12))+1)-Number(pullBarcodeBSS.substring(0,12));
                num = Number(pullBarcodeBSS.substring(0,12)) + num;
                pullBarcodeBSS = num.toString();
            }
          }
        }
            let odd:number = 0,even:number = 0;
            let j = 0;
            if(pullBarcodeBSS.length < 12){
              let checkLength = 12 -pullBarcodeBSS.length;
              for(let i=1;i<=checkLength;i++){
                pullBarcodeBSS = '0'+pullBarcodeBSS;
              }
            }
          for(let i=0;i<=11;i++){
            j++;
            if(((j)%2) == 0){
              even = Number(pullBarcodeBSS.substring(i,j))+even;
            }else{
              odd = Number(pullBarcodeBSS.substring(i,j))+odd;
            }
          }
          even = even*3;
          even = odd+even
          pullBarcodeBSS = (pullBarcodeBSS.substring(0,12))+(((even)%10).toString());
          let Num = this.itmBar.indexOf(this.itmBar.find(e => e.key == this.index));

          this.itmBar[Num].barcode = pullBarcodeBSS;
      })
      
    } else {
      this.itmBar.push({
        key: this.index + 1,
        option: "add",
        type: "1",
        barcode: ""
      })
    }
    this.index++;
    this.checkNumberOfBar();
  }

  addBarcode(Key,event){
    const val:string = event.target.value.toString();
    let num = this.itmBar.indexOf(this.itmBar.find(e => e.key == Key));
    let Item : barcodeDetail;
    this.itmBar[num].barcode = val;
    this.checkNumberOfBar();
  }

  scan(itemKey){
    this.service.keyitemBarcode = itemKey;
    if(this.common.getBarcode  != ""){
      let num = this.itmBar.indexOf(this.itmBar.find(e => e.key == itemKey));
      this.itmBar[num].barcode = this.common.getBarcode;
      this.common.getBarcode = "";
      this.service.keyitemBarcode = -1;
    }
    this.checker = true;
  }

  public async alertDeleteBarcode(key) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      header: 'ต้องการลบรายการนี้หรือไม่',
      buttons: [
        {
          text: 'ไม่ใช่',
          handler: () => {

          }
        },
        {
          text: 'ใช่',
          handler: () => {
            let check:number;
            let i=0;

            check = this.itmBar.findIndex(num => num.key == key);
            this.DelBar.push({key:this.itmBar[check].key,option:"del",barcode:this.itmBar[check].barcode,type:this.itmBar[check].type})
            this.itmBar.splice(check,1);
            let j=1;
            for( i=0;i<this.itmBar.length;i++){
              this.itmBar[i].key = j++;
            }
            this.index = j-1;
            j=1;
            for( i=0;i<this.DelBar.length;i++){
              this.DelBar[i].key = j++;
            }

          }
        }
      ]
    });

    await alert.present();
  }


  public async alertDeleteAllBarcode() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      header: 'ต้องการลบรายการทั้งหมดหรือไม่',
      buttons: [
        {
          text: 'ไม่ใช่',
          handler: () => {

          }
        },
        {
          text: 'ใช่',
          handler: () => {

            this.itmBar.forEach(e => {
              this.DelBar.push(
                {key:e.key,
                  option:"del",
                  barcode:e.barcode,
                  type:e.type}
              )
            });
            this.itmBar = [];
            
            this.index = 0;
            let j=1;
            for( let i=0;i<this.DelBar.length;i++){
              this.DelBar[i].key = j++;
            }
            
            this.checkNumberOfBar()
          }
        }
      ]
    });

    await alert.present();
  }
}


