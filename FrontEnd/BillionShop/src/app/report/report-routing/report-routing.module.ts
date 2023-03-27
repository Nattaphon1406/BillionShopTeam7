import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Pdr001Component } from '../productReceipt/pdr001/pdr001.component';
import { Sso001Component } from '../summarySaleOrder/sso001/sso001.component';

const routes: Routes = [
  {
    path: 'pdr001',
    component: Pdr001Component,
    data:{prmId :'pdr001', backPath: 'sell'}
  },
  {
    path: 'sso001',
    component: Sso001Component,
    data:{prmId : 'sso001', backPath: 'report'}
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
