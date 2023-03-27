import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http/';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CentralModule } from './central/central.module';
import { TabsPageModule } from './tabs/tabs.module';
import { DemoModule } from './demo/demo.module';
import { Camera } from '@ionic-native/camera/ngx';
import { ItmModule } from './itm/itm-routing/itm.module';
import { PcoModule } from './pco/pco.module';
import { NotiModule } from './noti/noti-routing/noti.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DatePipe } from '@angular/common';
import { RcvModule } from './rcv/rcv-routing/rcv.module';
import { ReportModule } from './report/report-routing/report.module';
import { StkModule } from './stk/stk-routing/stk.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    TabsPageModule,
    CentralModule,
    DemoModule,
    ItmModule,
    PcoModule,
    NotiModule,
    RcvModule,
    ReportModule,
    StkModule,
  ],
  exports: [
    SharedModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Camera, BarcodeScanner, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
