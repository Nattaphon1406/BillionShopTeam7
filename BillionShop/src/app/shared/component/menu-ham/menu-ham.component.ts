import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'app-menu-ham',
  templateUrl: './menu-ham.component.html',
  styleUrls: ['./menu-ham.component.scss'],
})
export class MenuHamComponent implements OnInit, OnDestroy {

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private menu: MenuController,
    private common: CommonService
  ) { }

  public userName: string;
  public emailUser: string;
  ngOnInit() {
    this.userName = localStorage.getItem("userName");
    this.emailUser = localStorage.getItem("emailUser");
  }

  ngOnDestroy() {

  }

  cleanSerach() {
    this.common.dataSearch = "";
    this.common.getBarcode = "";
  }

  goSell() {
    this.cleanSerach();
    this.menu.toggle('menuId');
    this.router.navigate(['sell']);
  }
  goBackHomePage() {
    this.cleanSerach();
    localStorage.removeItem("userName");
    localStorage.removeItem("userPermission");
    localStorage.removeItem("shopName");
    localStorage.removeItem("shopId"); //string to number : Number(parameter);
    localStorage.removeItem("userId");
    localStorage.removeItem("emailUser");
    localStorage.removeItem("nameUser");
    this.menu.toggle('menuId');
    this.router.navigate(['']);
  }
  goItem() {
    this.cleanSerach();
    this.menu.toggle('menuId');
    this.router.navigate(['itm001']);

  }
  goManageRol() {
    this.cleanSerach();
    this.menu.toggle('menuId');
    this.router.navigate(['rol']);
  }
  goPagePO() {
    this.cleanSerach();
    this.menu.toggle('menuId');
    this.router.navigate(['pco001']);
  }
  goPageNoti() {
    this.cleanSerach();
    this.menu.toggle('menuId');
    this.router.navigate(['noti001']);
  }

  goPageRVC() {
    this.cleanSerach();
    this.menu.toggle('menuId');
    this.router.navigate(['rcv001']);
  }

  goPageReportSell() {
    this.cleanSerach();
    this.menu.toggle('menuId');
    this.router.navigate(['sso001']);
  }

  goPageReportStock() {
    this.cleanSerach();
    this.menu.toggle('menuId');
    this.router.navigate(['pdr001']);
  }

  goPageAdjustStock() {
    this.cleanSerach();
    this.menu.toggle('menuId');
    this.router.navigate(['ajs001']);
  }

  goPageMovementStock() {
    this.cleanSerach();
    this.menu.toggle('menuId');
    this.router.navigate(['mms001']);
  }

  public async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      subHeader: 'คุณต้องการออกจากระบบหรือไม่',
      buttons: [

        {
          text: 'ไม่ใช่',
          handler: () => {
            console.log("No");

          }
        },
        {
          text: 'ใช่',
          handler: () => {
            localStorage.clear();
            this.goBackHomePage();
          }
        }
      ]
    });

    await alert.present();
  }

  showSubmenu: boolean = false;

  menuItemHandler(): void {
    this.showSubmenu = !this.showSubmenu;
  }

  showSubmenustock: boolean = false;

  menuSubStock(): void {
    this.showSubmenustock = !this.showSubmenustock;
  }
}
