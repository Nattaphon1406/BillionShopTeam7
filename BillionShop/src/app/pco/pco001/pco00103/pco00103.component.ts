import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pco00103',
  templateUrl: './pco00103.component.html',
  styleUrls: ['./pco00103.component.scss'],
})
export class Pco00103Component implements OnInit {
  public Text = "บันทึกข้อมูลสำเร็จ";
  public header: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    let poId = Number(this.route.snapshot.paramMap.get('poId'));
    let riId = Number(this.route.snapshot.paramMap.get('riId'));

    if (poId != 0) {
      this.header = "สร้างใบสั่งซื้อ";
      if (poId > 0) {
        setTimeout(() => { this.router.navigate(['pco001/pco00102', { poId: poId }]); }, 1500);
      } else if (poId < 0) {
        setTimeout(() => { this.router.navigate(['pco001']); }, 1500);
      }
    } else {
      this.header = "สร้างใบรับสินค้า";
      if (riId > 0) {
        setTimeout(() => { this.router.navigate(['rcv002',{ riId: riId }]); }, 1500);
      } else if (riId < 0) {
        setTimeout(() => { this.router.navigate(['rcv001']); }, 1500);
      }
    }

  }

}
