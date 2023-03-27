import { Component } from '@angular/core';
import { RcvService } from '../shared/services/rcv/rcv.service';

export interface ChartData {
  itemCode: string[];
  itemName: string[];
  itemQty: number[];
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  chartData: Array<ChartData> = [] as Array<ChartData>;

  constructor(private rcvService: RcvService) {

  }

  getItem(){
    this.rcvService.getfindItemQty(10000,'12-12-2021','12-12-2021').subscribe(res => {
      this.chartData  = JSON.parse(JSON.stringify(res));;
    });
    console.log('dataTest: ',this.chartData);
  }

}
