import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotiRoutingModule } from './noti-routing.module';
import { SharedModule } from 'src/app/shared/shared.module'; 
import { Noti001Component } from '../noti001/noti001.component';
import { Noti002Component } from '../noti002/noti002.component';
import { NotiService } from '../service/noti.service';

@NgModule({
  declarations: [Noti001Component,Noti002Component],
  imports: [
    CommonModule,
    NotiRoutingModule,
    SharedModule
  ],
  providers: [
    NotiService
  ]
})
export class NotiModule { }
