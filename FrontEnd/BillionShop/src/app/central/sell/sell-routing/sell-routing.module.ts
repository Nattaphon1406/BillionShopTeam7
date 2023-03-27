import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Sell001Component } from '../sell001/sell001.component';
import { Sell004Component } from '../sell004/sell004.component';
import { Sell003Component } from '../sell003/sell003.component';
import { Sell002Component } from '../sell002/sell002.component';
import { Sell005Component } from '../sell005/sell005.component';

const routes: Routes = [
  {
    path: 'sell',
    component: Sell001Component,
    data:{prmId :'sell001', backPath: 'sell'}
  },
  {
    path: 'payment',
    component: Sell004Component,
    data:{prmId : 'sell004', backPath: 'bucket'}
  },

  {
    path: 'bucket',
    component: Sell003Component,
    data:{prmId : 'sell003', backPath: 'sell'}
  },
  {
    path: 'sell002',
    component: Sell002Component,
    data:{prmId : 'sell002', backPath: 'sell'}
  },
  {
    path: 'sell005',
    component: Sell005Component,
    data:{prmId : 'sell005', backPath: 'sell'}
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class SellRoutingModule { }






