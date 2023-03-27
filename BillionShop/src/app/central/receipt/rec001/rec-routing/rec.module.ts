import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { FormsModule } from '@angular/forms';
import { Rec001Component } from '../rec001.component';
import { RecRoutingModule } from './rec-routing.module';
@NgModule({
  declarations: [Rec001Component],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RecRoutingModule
  ]
})
export class RecModule { }
