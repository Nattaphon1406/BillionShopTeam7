import { Component, DoCheck, OnInit } from '@angular/core';
import { Rol001Service } from '../service/rol001.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { rol001 } from './model/rol001';

@Component({
  selector: 'app-rol001',
  templateUrl: './rol001.component.html',
  styleUrls: ['./rol001.component.scss'],
})
export class Rol001Component implements OnInit ,DoCheck{
  public rol: rol001;
  public srchRol: any;
  public user_id : any;
  public user_permission : any;
  public user_shop_id : any;
  public showListItem = true;
  public checker:number = 1;

  constructor(
    private rol001Service : Rol001Service,
    private alertCtrl:AlertController
    
  ) {
   
   }

  ngOnInit() {
    this.user_id = localStorage.getItem('userId');
    this.user_permission = localStorage.getItem("userPermission");
    this.user_shop_id = Number(localStorage.getItem("shopId"));
    this.getUserData();
  }

  ngDoCheck()
  {
    if(this.checker == 0){
      this.getUserData();
      this.checker = 1;
    }
    
  }

  Checker(){
    this.checker = 0;
  }

  checkDataItem() {
    if (Object.keys(this.rol).length == 0) {
      this.showListItem = false;
    } else {
      this.showListItem = true;
    }
  }

  getUserData(){
    this.rol001Service.getUserdata(this.user_shop_id).subscribe(res => {
      this.rol = res;
      this.srchRol = this.rol;
      this.checkDataItem();
    });
  }

  getFindUserData(data:string){
    this.rol001Service.getFindUserData(data,this.user_shop_id).subscribe(res => {
      this.rol = res;
      this.srchRol = this.rol;
      this.checkDataItem();
    });
  }

  search(event){
    let val = event.target.value;
    if (val && val.trim() !== '') {
      this.getFindUserData(val);
    }else if(val.trim() === ''){
      this.getUserData();
      this.checkDataItem()
    }
  }
  delete(us_id : number){
    this.rol001Service.DeleteUser(us_id).subscribe( res =>{
      this.getUserData();
    });
  }

  deleteAll(){
    this.rol001Service.DeleteAllUser(this.user_shop_id).subscribe( res =>{
      this.getUserData();
    });
  }

  public checkUserId(UID:Number){
    if(UID == Number(localStorage.getItem('userId')) || this.user_permission != '1'){
      this.alertnotdelete();
    }else{
      this.alertdelete(UID);
    }
    this.getUserData();
  }

  public async alertnotdelete(){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      subHeader: 'ไม่สามารถลบรายการนี้ได้',
      buttons: [
      {
        text: 'ตกลง',
        handler: () =>{
        }    
      }
    ]
    });
    await alert.present();
  }

  public async alertdelete(us_id){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      subHeader: 'ต้องการลบรายการนี้หรือไม่',
      buttons: [
      
      {
        text: 'ไม่ใช่',
        handler: () =>{
          this.getUserData();
        } 
      },
      {
        text: 'ใช่',
        handler: () =>{
          this.delete(us_id);
        }    
      }
    ]
    });
    await alert.present();
  }

  public async AlertDeleteAll(){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      subHeader: ' ต้องการลบรายการทั้งหมดหรือไม่',
      buttons: [
      
      {
        text: 'ไม่ใช่',
        handler: () =>{
          this.getUserData();
        } 
      },
      {
        text: 'ใช่',
        handler: () =>{
          if(this.user_permission != "1"){
            this.alert_delete_owner();
          }else{
            this.deleteAll();
          }
        }    
      }
    ]
    });
    await alert.present();
  }

  public async alert_delete_owner() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-not-complete',
      backdropDismiss: false,
      header: 'ไม่สามารถลบข้อมูลผู้ใช้งานได้',
      buttons: [{ text: 'ตกลง' }],
    });

    await alert.present();
  }
}

