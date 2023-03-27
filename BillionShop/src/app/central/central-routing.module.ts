import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Hom001Component } from './home/hom001/hom001.component';
import { Log001Component } from './login/log001/log001.component';
import { Reg001Component } from './register/reg001/reg001.component';
import { Reg00101Component } from './register/reg001/reg00101/reg00101.component';
import { Rol001Component } from './manageRole/rol001/rol001.component';
import { Rol002Component } from './manageRole/rol002/rol002.component';
import { Rol00201Component } from './manageRole/rol002/rol00201/rol00201.component';
import { Rec001Component } from './receipt/rec001/rec001.component';
const routes: Routes = [
  {
    path: '',
    component: Hom001Component,
  },
  {
    path: 'reg',
    component: Reg001Component,
  },
  {
    path: 'reg/succeed',
    component: Reg00101Component,
  },
  {
    path: 'log',
    component: Log001Component,
  },
  {
    path: 'rol',
    component: Rol001Component,
    data: { prmId: 'rol001', backPath: 'sell' ,search:"no"}
  },
  {
    path: 'rol/rol002',
    component: Rol002Component,
    data: { prmId: 'rol002' }
  },
  {
    path: 'rol/success',
    component: Rol00201Component
  },
  {
    path: 'rec',
    component: Rec001Component
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class CentralRoutingModule { }
