import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Sell001Component } from '../sell001/sell001.component';
import { Sell004Component } from '../sell004/sell004.component';
import { Sell003Component } from '../sell003/sell003.component';
import { Sell002Component } from '../sell002/sell002.component';
import { Sell005Component } from '../sell005/sell005.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SellRoutingModule } from './sell-routing.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';


@NgModule({
  declarations: [Sell001Component, Sell004Component, Sell003Component, Sell002Component, Sell005Component],
  imports: [
    CommonModule,
    SellRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [CurrencyPipe]

})
export class SellModule { }
