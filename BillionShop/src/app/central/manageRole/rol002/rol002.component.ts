import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Rol001Service } from '../service/rol001.service';
import { rol001 } from '../rol001/model/rol001';
@Component({
  selector: 'app-rol002',
  templateUrl: './rol002.component.html',
  styleUrls: ['./rol002.component.scss'],
})
export class Rol002Component implements OnInit {
  public user_shop_name: any;
  public user_shop_id: any;
  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private rol001Service: Rol001Service) { }
  ngOnInit() {
    this.user_shop_name = localStorage.getItem("shopName");
    this.user_shop_id = localStorage.getItem("shopId")
  }
  
  goSucceed(fname: string, lname: string, email: string, tel: number, position: string, username: string, password: string, passwordConfirm: string, nameShop: string) {
    if (fname != "" && lname != "" && email != "" && tel != null && username != "" && password != "" && passwordConfirm != "" && nameShop != "") {
      //* กรอกข้อมูลลงทะเบียนครบ
      if (fname.match(/[1234567890]/g) != null || lname.match(/[1234567890]/g) != null || username.match(/[1234567890]/g)) {
        //* กรอกชื่อและนามสกุลเป็นตัวเลข
        this.alert_not_info();
      } else if (email.includes('@') == false) {
        //* กรอกข้อมูลลงทะเบียนครบ
        this.alert_not_info();
      } else if (isNaN(tel) || tel.toString().length != 10 || tel[0] != 0) {
        //* กรอกเบอร์โทรศัพท์ผิด(ไม่เป็นตัวเลข หรือไม่ถึง 10 ตัว)
        this.alert_not_info();
      } else if (tel.toString().length == 10) {
        //* กรอกเบอร์โทรศัพท์ถูกต้อง
        if (password.length < 8) {
          //* รหัสผ่านต้องมากว่า 8 ตัวอักษร
          this.alert_not_info();
        } else if (password.length >= 8) {
          //* กรอกรหัสมากกว่า 8 ตัวอักษร
          if (password != passwordConfirm) {
            this.alert_not_info();
            //* กรอกรหัสผ่านไม่ตรงกัน
          } else if (password == passwordConfirm) {
            //* กรอกรหัสผ่านตรงกัน
            let createUser:rol001 = {
              'us_email': email ,
              'us_first_name': fname,
              'us_last_name': lname,
              'sh_name': nameShop,
              'us_pass_word': password,
              'us_permission': "2",
              'us_tel': tel.toString(),
              'userName': username,
              'sh_id':this.user_shop_id
            }
            this.rol001Service.putUserdata(createUser).subscribe(res => {
              if (res) {
                this.router.navigate(['rol/success']);
              } else {
                this.alert_not_username();
              }
            });
          }
        }
      }
    } else {
      //* กรอกข้อมูลลงทะเบียนไม่ครบ
      this.alert_not_complete();
    }
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

  public async alert_not_username() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-not-complete',
      backdropDismiss: false,
      header: 'มีชื่อผู้ใช้งานนี้อยู่ในระบบแล้ว',
      buttons: [{ text: 'ตกลง' }],
    });

    await alert.present();
  }

  public async alertConfirmAddUser(fname: string, lname: string, email: string, tel: number, position: string, username: string, password: string, passwordConfirm: string, nameShop: string){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      subHeader: 'ต้องการยืนยันข้อมูลหรือไม่',
      buttons: [
      
      {
        text: 'ไม่ใช่',
        handler: () =>{
          
        } 
      },
      {
        text: 'ใช่',
        handler: () =>{
          this.goSucceed(fname, lname, email, tel, position, username, password, passwordConfirm, nameShop)
        }    
      }
    ]
    });
    await alert.present();
  }
}
