import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ajs00103',
  templateUrl: './ajs00103.component.html',
  styleUrls: ['./ajs00103.component.scss'],
})
export class Ajs00103Component implements OnInit {

  public Text:string ;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    this.Text = "บันทึกข้อมูลสำเร็จ";
    setTimeout(() => { this.router.navigate(['ajs001']); }, 1500);
  }

}
