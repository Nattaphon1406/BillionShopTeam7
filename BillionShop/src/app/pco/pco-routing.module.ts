import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Pco001Component } from './pco001/pco001.component';
import { Pco00101Component } from './pco001/pco00101/pco00101.component';
import { Pco00102Component } from './pco001/pco00102/pco00102.component';
import { Pco00103Component } from './pco001/pco00103/pco00103.component';


const routes: Routes = [
  {
    path: 'pco001',
    component: Pco001Component,
    data: { prmId: 'pco001', backPath: "sell",search:"no" }
  },
  {
    path: 'pco001/pco00101',
    component: Pco00101Component,
    data: { prmId: 'pco00101', backPath: "pco001" }
  },
  {
    path: 'pco001/pco00102',
    component: Pco00102Component,
    data: { prmId: 'pco00102', backPath: "pco001" }
  },
  {
    path: 'pco001/pco00103',
    component: Pco00103Component,
    data: { prmId: 'pco00102', backPath: "pco001" }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class PcoRoutingModule { }
