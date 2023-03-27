import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Itm001Component } from '../itm001/itm001.component';
import { Itm002Component } from '../itm002/itm002.component';
import { DemoRoutingModule } from '../../demo/demo-routing.module';
import { Itm00201Component } from '../itm002/itm00201/itm00201.component';
import { itmModal } from '../itmModal/itmModal.component';

const routes: Routes = [
  {
    path: 'itm001',
    component: Itm001Component,
    data: { prmId: 'itm001'}
  }, {
    path: 'itm002',
    component: Itm002Component,
    data: { prmId: 'itm002', backPath: 'itm001' }
  },
  {
    path: 'itm002/success',
    component: Itm00201Component,
  },{
    path: 'itm002/addBarcode',
    component: itmModal,
    data:{ prmId: 'addbarcode'}
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class ItmRoutingModule { }






