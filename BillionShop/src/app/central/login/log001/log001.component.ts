import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Log001Service } from './service/log001.service';

@Component({
  selector: 'app-log001',
  templateUrl: './log001.component.html',
  styleUrls: ['./log001.component.scss'],
})
export class Log001Component implements OnInit {

  constructor(
    private log001Service: Log001Service,
    private router: Router,
    private alertCtrl: AlertController,
  ) {

  }

  ngOnInit() { }

  public gologin(user: string, pass: string) {
    if (user != "" && pass != "") {
      this.log001Service.getLogindata(user, pass).subscribe(res => {
        if (res) {
          localStorage.setItem("userName", res[0].us_user_name);
          localStorage.setItem("userPermission", res[0].us_permission);
          localStorage.setItem("shopName", res[0].sh_name);
          localStorage.setItem("shopId", res[0].sh_id.toString()); //string to number : Number(parameter);
          localStorage.setItem("userId", res[0].us_id.toString());
          localStorage.setItem("emailUser", res[0].us_email);
          localStorage.setItem("nameUser", res[0].us_first_name + " " +  res[0].us_last_name);
          this.router.navigate(['sell']);
        } else {
          this.alert_not_user();
        }
      });
    } else {
      this.alert_not_complete();
    }
  }

  public async alert_not_complete() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-not-complete',
      backdropDismiss: false,
      header: 'ไม่ได้กรอกชื่อผู้ใช้หรือรหัสผ่าน',
      subHeader: 'กรุณากรอกใหม่อีกครั้ง',
      buttons: [{ text: 'ตกลง' }],
    });

    await alert.present();
  }

  public async alert_not_user() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-not-complete',
      backdropDismiss: false,
      header: 'กรอกชื่อผู้ใช้งานหรือรหัสผ่านผิด',
      subHeader: 'กรุณากรอกใหม่อีกครั้ง',
      buttons: [{ text: 'ตกลง' }],
    });

    await alert.present();
  }
}
