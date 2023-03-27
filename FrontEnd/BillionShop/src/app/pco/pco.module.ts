import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PcoRoutingModule } from './pco-routing.module';
import { SharedModule } from '../shared/shared.module';
import { Pco001Component } from './pco001/pco001.component';
import { Pco00101Component } from './pco001/pco00101/pco00101.component';
import { Pco001Service } from './service/pco001.service';
import { Pco00102Component } from './pco001/pco00102/pco00102.component';
import { FormsModule } from '@angular/forms';
import { Pco00103Component } from './pco001/pco00103/pco00103.component';
import { HttpClientModule } from '@angular/common/http/';

@NgModule({
  declarations: [
    Pco001Component,
    Pco00101Component,
    Pco00102Component,
    Pco00103Component,
  ],
  imports: [
    CommonModule,
    PcoRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    Pco001Service
  ]
})
export class PcoModule { }
