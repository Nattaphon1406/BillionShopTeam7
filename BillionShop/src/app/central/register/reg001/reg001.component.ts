import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Reg001Service } from './service/reg001.service';
import { reg001 } from './model/reg001';

@Component({
  selector: 'app-reg001',
  templateUrl: './reg001.component.html',
  styleUrls: ['./reg001.component.scss'],
})
export class Reg001Component implements OnInit {

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private reg001Service: Reg001Service,
  ) { }

  ngOnInit() {
  }

  goSucceed(fname: string, lname: string, email: string, tel: number, position: string, username: string, password: string, passwordConfirm: string, nameShop: string) {
    if (fname != "" && lname != "" && email != "" && tel != null && username != "" && password != "" && passwordConfirm != "" && nameShop != "" && tel.toString() != "") {
      //* กรอกข้อมูลลงทะเบียนครบ
      if (fname.match(/[1234567890]/g) != null || lname.match(/[1234567890]/g) != null || username.match(/[1234567890]/g)) {
        this.alert_not_info();
      } else if (email.includes('@') == false) {
        this.alert_not_info();
      } else if (isNaN(tel) || tel.toString().length != 10 || tel[0] != 0) {
        this.alert_not_info();
      } else if (tel.toString().length == 10) {
        if (password.length < 8) {
          //* รหัสผ่านต้องมากว่า 8 ตัวอักษร
          this.alert_not_info();
        } else if (password.length >= 8) {
          //* กรอกรหัสมากกว่า 8 ตัวอักษร
          if (password != passwordConfirm) {
            this.alert_not_info();
          } else if (password == passwordConfirm) {
            //* กรอกรหัสผ่านตรงกัน
            let userCreate: reg001 = {
              'us_email': email,
              'us_first_name': fname,
              'us_last_name': lname,
              'sh_name': nameShop,
              'us_pass_word': password,
              'us_permission': "1",
              'us_tel': tel.toString(),
              'userName': username
            }
            this.reg001Service.putUserdata(userCreate).subscribe(res => {
              if (res) {
                this.router.navigate(['reg/succeed']);
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

}
