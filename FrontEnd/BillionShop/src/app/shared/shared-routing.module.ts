import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ItmChooseListComponent } from './component/itm-choose-list/itm-choose-list.component';
import { ScanBarcodeComponent } from './component/scan-barcode/scan-barcode.component';

const routes: Routes = [
  {
    path: 'itm_choose',
    component: ItmChooseListComponent,
    data:{prmId :'itm_choose'}
  },{
    path: 'scanBarcode',
    component:ScanBarcodeComponent,
    data:{prmId : 'scanBarcode'}
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
