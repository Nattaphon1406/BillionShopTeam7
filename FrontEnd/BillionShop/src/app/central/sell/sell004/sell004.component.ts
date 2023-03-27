import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SellService } from '../sell.service';
import { sellPayment } from '../sell-model/sellPayment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sell004',
  templateUrl: './sell004.component.html',
  styleUrls: ['./sell004.component.scss'],
})
export class Sell004Component implements OnInit {
  private rcCode="";
  private cash:any=0;
  private userName: any = localStorage.getItem("userName");
  private shId: any = Number(localStorage.getItem("shopId"));
  private total:any;
  private change:any=0;

  constructor(
    private alertCtrl: AlertController,
    private sellService: SellService,
    private router: Router
  ) { 
  }
  
  ngOnInit() {
    this.total = this.sellService.totalPrice;
    this.total = parseFloat(this.total).toFixed(2);
  }
  
  transformAmount($event) {
    if($event!="NaN"){
      $event.target.value = parseFloat($event.target.value).toFixed(2);
      this.cash= $event.target.value;
      this.change=this.accoutChange();
    }
  }
  addMoney(num){
    this.cash = Number(this.cash);
    this.cash = this.cash+num;
    this.cash = parseFloat(this.cash).toFixed(2);
    this.change = this.accoutChange();
  }
  
  accoutChange(){
    if(Number(this.cash) > Number(this.total)){
      this.change = Number(this.cash) - Number(this.total);
    }
    return parseFloat(this.change).toFixed(2);
  }

  public async alert_not_enough_money() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-not-complete',
      backdropDismiss: false,
      header: 'จำนวนเงินที่รับมาไม่เพียงพอ',
      subHeader: 'กรุณาเพิ่มจำนวนเงิน',
      buttons: [{ text: 'ตกลง' }],
    });
    await alert.present();
  }

  gencode(){
    
  }

  chekpayment(){
    if(Number(this.cash) < Number(this.total)){
      console.log(this.change + " เงินไม่พอ");
      this.alert_not_enough_money();
    }else{
      let SellInsert:sellPayment;
      SellInsert = {
        'rcCode':this.rcCode,
        'totalPrice':this.total,
        'cash':this.cash,
        'change':this.change,
        'createBy':this.userName,
        'updateBy':this.userName,
        'shId':this.shId
      };
      this.sellService.putHeaderPayment(SellInsert).subscribe(res=>{
        let rcId = res[0].id;
        this.sellService.Bucket.forEach(e => {
          this.sellService.putDetailPayment(e,rcId,this.userName).subscribe(res=>{
            this.sellService.Bucket.splice(0,1);
            if(this.sellService.Bucket.length == 0){
              this.router.navigate(['sell005',{rcId: rcId}]);
            }
            
          });
        }); 
        this.sellService.totalPrice = 0;
      });
      
    }  
  }
}
