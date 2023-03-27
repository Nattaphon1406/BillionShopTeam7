import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Rcv001Component } from '../rcv001/rcv001.component';
import { Rcv00101Component } from '../rcv001/rcv00101/rcv00101.component';
import { Rcv004Component } from '../rcv004/rcv004.component';
import { Rcv002Component } from '../rcv002/rcv002.component';

const routes: Routes = [
  {
    path: 'rcv001',
    component: Rcv001Component,
    data: { prmId: 'rcv001', search: "no" }
  },
  {
    path: 'rcv001/rcv00101',
    component: Rcv00101Component,
    data: { prmId: 'rcv00101', backPath: "rcv001" }
  },
  {
    path: 'rcv004',
    component: Rcv004Component,
    data: { prmId: 'rcv004', backPath: "rcv001" }
  },
  {
    path: 'rcv002',
    component: Rcv002Component,
    data: { prmId: 'rcv002', backPath: "rcv001" }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class RcvRoutingModule { }






