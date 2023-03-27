import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-icon-scanbarcode',
  templateUrl: './icon-scanbarcode.component.html',
  styleUrls: ['./icon-scanbarcode.component.scss'],
})
export class IconScanbarcodeComponent implements OnInit {

  constructor(private router: Router,private activedRoute: ActivatedRoute) { }

  ngOnInit() {}

  gotoscanBarcode(){
    this.router.navigate(['scanBarcode'])
  }
}
