import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RcvRoutingModule } from './rcv-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { Rcv001Service } from '../service/rcv001.service';
import { rcv002Service } from './../service/rcv002.service'
import { Rcv001Component } from '../rcv001/rcv001.component';
import { Rcv00101Component } from '../rcv001/rcv00101/rcv00101.component';
import { Rcv004Component } from '../rcv004/rcv004.component';
import { Rcv002Component } from '../rcv002/rcv002.component';
import { HttpClientModule } from '@angular/common/http';
import { Pco00102Component } from './../../pco/pco001/pco00102/pco00102.component'
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    Rcv001Component,
    Rcv001Component,
    Rcv00101Component,
    Rcv004Component,
    Rcv002Component,
  ],
  imports: [
    CommonModule,
    RcvRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    Rcv001Service,
    rcv002Service,
    Pco00102Component,
    Rcv002Component
  ]
})
export class RcvModule { }
