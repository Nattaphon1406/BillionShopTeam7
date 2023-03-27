import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-icon-dark-scanbarcode',
  templateUrl: './icon-dark-scanbarcode.component.html',
  styleUrls: ['./icon-dark-scanbarcode.component.scss'],
})
export class IconDarkScanbarcodeComponent implements OnInit {

  constructor(private router: Router,private activedRoute: ActivatedRoute) { }

  ngOnInit() {}

  gotoscanBarcode(){
    this.router.navigate(['scanBarcode'])
  }

}
