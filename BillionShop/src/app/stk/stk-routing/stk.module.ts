import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportRoutingModule } from './stk-routing.module';
import { FormsModule } from '@angular/forms';
import { Ajs001Component } from '../adjustStock/ajs001/ajs001.component';
import { Ajs00101Component } from '../adjustStock/ajs001/ajs00101/ajs00101.component';
import { Mms001Component } from '../movementStock/mms001/mms001.component';
import { Ajs00102Component } from '../adjustStock/ajs001/ajs00102/ajs00102.component';
import { Mms002Component } from '../movementStock/mms002/mms002.component';
import { Mms003Component } from '../movementStock/mms003/mms003.component';
import { Ajs00103Component } from '../adjustStock/ajs001/ajs00103/ajs00103.component';


@NgModule({
  declarations: [Ajs001Component, Ajs00101Component, Mms001Component,Ajs00102Component,Mms002Component,Mms003Component,Ajs00103Component],
  imports: [
    CommonModule,
    SharedModule,
    ReportRoutingModule,
    FormsModule
  ],
})
export class StkModule { }
