import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rol00201',
  templateUrl: './rol00201.component.html',
  styleUrls: ['./rol00201.component.scss'],
})
export class Rol00201Component implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.presentLoading();
  }

  async presentLoading() {
    setTimeout(() => { this.router.navigate(['rol/rol002']); }, 2000);
  }

}
