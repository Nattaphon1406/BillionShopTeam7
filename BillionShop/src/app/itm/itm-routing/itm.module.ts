import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItmRoutingModule } from './itm-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { Itm001Component } from '../itm001/itm001.component';
import { Itm002Component } from '../itm002/itm002.component';
import { itmModal } from '../itmModal/itmModal.component'
import { Itm00201Component } from '../itm002/itm00201/itm00201.component';
import { FormsModule } from '@angular/forms'
@NgModule({
  declarations: [Itm001Component, Itm002Component, itmModal, Itm00201Component],
  imports: [
    CommonModule,
    ItmRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ItmModule { }
