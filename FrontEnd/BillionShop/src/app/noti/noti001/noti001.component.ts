import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NotiHeader } from './model/notiHeader';
import { NotiService } from '../service/noti.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-noti001',
  templateUrl: './noti001.component.html',
  styleUrls: ['./noti001.component.scss'],
})
export class Noti001Component implements OnInit {
  public noti: Array<NotiHeader> = [] as Array<NotiHeader>;
  public infoNoti:any;
  public shop_id :number;
  public ishidden : boolean = false;
  public notiHead : NotiHeader;
  public notiamount : Number=0;
  public showNotify:boolean = true;
  constructor(
    private NotiService: NotiService,
    private router: Router,
    private alertCtrl:AlertController,
    private datepipe:DatePipe
    ) { }
    public date:string;
  ngOnInit() {
    this.NotiService.getNotiData().subscribe(res=>{
      this.noti = res as NotiHeader[];
      this.infoNoti = this.noti;
      this.date = this.datepipe.transform(Date(),'dd/MM/yyyy');
    });
    this.shop_id = Number(localStorage.getItem('shopId'));
    this.GetDataHeader();
  }

  ionViewWillEnter(){
    this.GetDataHeader();
  }
  
  checkNumNotify(){
    if(this.notiamount != 0){
      this.showNotify = true;
    }else{
      this.showNotify = false;
    }
  }

  showNotiDetail() {
    this.router.navigate(['noti002/',this.date,this.notiamount], { skipLocationChange: true });
  }

  GetDataHeader(){
    this.NotiService.getHeader(this.shop_id).subscribe(res => {
      this.notiHead = res[0];
      this.notiamount = this.notiHead.numberNotiList; 
      this.checkNumNotify();     
    });
  }

  public async AlertDeleteThis(){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      subHeader: 'ต้องการลบรายการนี้หรือไม่',
      buttons: [
      {
        text: 'ไม่ใช่',
        handler: () =>{
        } 
      },
      {
        text: 'ใช่',
        handler: () =>{
          this.hideButton();
        }    
      }
    ]
    });

    await alert.present();
  }

  hideButton(){
    this.ishidden = true;
  }
}


