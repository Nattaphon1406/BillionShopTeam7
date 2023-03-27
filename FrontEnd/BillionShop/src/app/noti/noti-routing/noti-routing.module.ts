import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Noti001Component } from '../noti001/noti001.component';
import { Noti002Component } from '../noti002/noti002.component';

const routes: Routes = [
  {
    path: 'noti001',
    component: Noti001Component,
    data:{prmId :'noti001'}
  },
  {
    path: 'noti002/:notiDate/:notiamount',
    component: Noti002Component,
    data:{prmId :'noti002'}
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class NotiRoutingModule { }






