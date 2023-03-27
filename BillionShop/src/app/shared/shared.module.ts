import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderWithMenuComponent } from './component/header-with-menu/header-with-menu.component';
import { MenuHamComponent } from './component/menu-ham/menu-ham.component';
import { SearchBarComponent } from './component/search-bar/search-bar.component';
import { HeaderWithBtnBackComponent } from './component/header-with-btn-back/header-with-btn-back.component';
import { HeaderWithBackSaveComponent } from './component/header-with-back-save/header-with-back-save.component';
import { HeaderWithBackNoSearchComponent } from './component/header-with-back-no-search/header-with-back-no-search.component';
import { HeaderWithBackSearchNoScanComponent } from './component/header-with-back-search-no-scan/header-with-back-search-no-scan.component';
import { ItmChooseListComponent } from './component/itm-choose-list/itm-choose-list.component';
import { ScanBarcodeComponent } from './component/scan-barcode/scan-barcode.component';
import { SharedRoutingModule } from './shared-routing.module';
import { HeaderWithUserComponent } from './header-with-user/header-with-user.component';
import { IconScanbarcodeComponent } from './component/icon-scanbarcode/icon-scanbarcode.component';
import { IconDarkScanbarcodeComponent } from './component/icon-dark-scanbarcode/icon-dark-scanbarcode.component';
import { HeaderWithSearchComponent } from './component/header-with-search-bar/header-with-search.component'
import { HeaderWithMenuNoSearchComponent } from './component/header-with-menu-no-search/header-with-menu-no-search.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HeaderWithMenuComponent,
    MenuHamComponent,
    SearchBarComponent,
    HeaderWithBtnBackComponent,
    HeaderWithBackSaveComponent,
    HeaderWithBackNoSearchComponent,
    HeaderWithBackSearchNoScanComponent,
    ItmChooseListComponent,
    ScanBarcodeComponent,
    HeaderWithUserComponent,
    IconScanbarcodeComponent,
    IconDarkScanbarcodeComponent,
    HeaderWithSearchComponent,
    HeaderWithMenuNoSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedRoutingModule,
    HttpClientModule
  ],
  exports: [
    HeaderWithMenuComponent,
    MenuHamComponent,
    SearchBarComponent,
    HeaderWithBtnBackComponent,
    HeaderWithBackSaveComponent,
    HeaderWithBackNoSearchComponent,
    HeaderWithBackSearchNoScanComponent,
    ItmChooseListComponent,
    ScanBarcodeComponent,
    HeaderWithUserComponent,
    IconScanbarcodeComponent,
    IconDarkScanbarcodeComponent,
    HeaderWithSearchComponent,
    HeaderWithMenuNoSearchComponent
  ]

})
export class SharedModule { }
