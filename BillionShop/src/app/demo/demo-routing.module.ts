import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Demo001Component } from './demo001/demo001.component';
import { Demo002Component } from './demo002/demo002.component';
import { Demo00101Component } from './demo001/demo00101/demo00101.component';

const routes: Routes = [
  {
    path: 'demo001',
    component: Demo001Component,
    data: {prmId: '001'}
  },
  {
    path: 'demo001/demo00101/:itemCd',
    component: Demo00101Component,
    data: { prmId: '002'}
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
