import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pdr001Component } from '../productReceipt/pdr001/pdr001.component';
import { Sso001Component } from '../summarySaleOrder/sso001/sso001.component';
import { SharedModule } from 'src/app/shared/shared.module'; 
import { ReportRoutingModule } from './report-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [Pdr001Component,Sso001Component],
  imports: [
    CommonModule,
    SharedModule,
    ReportRoutingModule,
    FormsModule
  ]
})
export class ReportModule { }
