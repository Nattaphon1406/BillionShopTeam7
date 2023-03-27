import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ajs00101Service } from 'src/app/stk/service/ajs00101.service';

@Component({
  selector: 'app-ajs00101',
  templateUrl: './ajs00101.component.html',
  styleUrls: ['./ajs00101.component.scss'],
})
export class Ajs00101Component implements OnInit {
  itms: any;
  srchItms: any;

  saId: Number;
  saCode: String;
  saDate: String;
  saGenUser: String;
  saReason: String;
  saNote: String;
  public shopId = Number(localStorage.getItem('shopId'));

  constructor(
    private route: ActivatedRoute,
    private ajs00101Service: Ajs00101Service,
  ) {
    this.saId = Number(this.route.snapshot.paramMap.get('saId'));
  }

  ngOnInit() {
    this.getAdjustStockHeader();
    this.getAdjustStockDetail();
  }

  getAdjustStockHeader() {
    this.ajs00101Service.getAdjustStockHeaderBySaId(this.saId, this.shopId).subscribe(ref => {
      this.saCode = ref[0].saCode;
      this.saDate = ref[0].saDate;
      this.saGenUser = ref[0].saGenUser;
      this.saReason = ref[0].saReason;
      this.saNote = ref[0].saNote;
    });
  }

  getAdjustStockDetail() {
    this.ajs00101Service.getAdjustStockDetail(this.saId).subscribe(res => {
      this.itms = res;
      this.srchItms = this.itms;
    });
  }

}
