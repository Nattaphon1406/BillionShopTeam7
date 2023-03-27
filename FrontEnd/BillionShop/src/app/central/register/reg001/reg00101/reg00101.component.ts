import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg00102',
  templateUrl: './reg00101.component.html',
  styleUrls: ['./reg00101.component.scss'],
})
export class Reg00101Component implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.presentLoading();
  }

  async presentLoading() {
    setTimeout(() => { this.router.navigate(['log']); }, 2000);
  }

}
