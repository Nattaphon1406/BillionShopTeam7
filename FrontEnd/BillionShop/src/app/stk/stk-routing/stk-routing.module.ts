import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Ajs001Component } from '../adjustStock/ajs001/ajs001.component';
import { Mms001Component } from '../movementStock/mms001/mms001.component';
import { Ajs00101Component } from '../adjustStock/ajs001/ajs00101/ajs00101.component';
import { Ajs00102Component } from '../adjustStock/ajs001/ajs00102/ajs00102.component';
import { Mms002Component } from '../movementStock/mms002/mms002.component';
import { Mms003Component } from '../movementStock/mms003/mms003.component';
import { Ajs00103Component } from '../adjustStock/ajs001/ajs00103/ajs00103.component';

const routes: Routes = [
  {
    path: 'ajs001',
    component: Ajs001Component,
    data: { prmId: 'ajs001', backPath: 'sell', search: "no" }
  },
  {
    path: 'ajs001/ajs00101',
    component: Ajs00101Component,
    data: { prmId: 'ajs00101', backPath: 'ajs001' }
  },{
    path: 'ajs001/ajs00102',
    component: Ajs00102Component,
    data: { prmId: 'ajs00102', backPath: 'ajs001' }
  },
  {
    path: 'mms001',
    component: Mms001Component,
    data: { prmId: 'mms001', backPath: 'sell' }
  },
  {
    path: 'mms002',
    component: Mms002Component,
    data: { prmId: 'mms002', backPath: 'mms001' }
  },
  {
    path: 'mms003',
    component: Mms003Component,
    data: { prmId: 'mms003', backPath: 'mms002' }
  }, {
    path: 'ajs001/ajs00103',
    component: Ajs00103Component,
    data: { prmId: 'ajs00102', backPath: 'ajs001'}
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
