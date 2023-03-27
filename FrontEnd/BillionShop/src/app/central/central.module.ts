import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Log001Component } from './login/log001/log001.component';
import { Log002Component } from './login/log002/log002.component';
import { SharedModule } from '../shared/shared.module';
import { CentralRoutingModule } from './central-routing.module';
import { Hom001Component } from './home/hom001/hom001.component';
import { SellModule } from './sell/sell-routing/sell.module';
import { Rol001Component } from './manageRole/rol001/rol001.component';
import { Rol00201Component } from './manageRole/rol002/rol00201/rol00201.component';
import { Rol002Component } from './manageRole/rol002/rol002.component';
import { Reg001Component } from './register/reg001/reg001.component';

@NgModule({
  declarations: [Log001Component, Log002Component, Reg001Component, Hom001Component, Rol001Component,Rol00201Component,Rol002Component],
  imports: [
    CommonModule,
    SharedModule,
    CentralRoutingModule,
    SellModule
  ]
})
export class CentralModule { }
