import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Rec001Component } from '../rec001.component';

const routes: Routes = [
  {
    path: 'rec001',
    component: Rec001Component,
    data: { prmId: 'rec001'}
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class RecRoutingModule { }






