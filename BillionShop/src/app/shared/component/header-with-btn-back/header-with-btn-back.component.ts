import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'app-header-with-btn-back',
  templateUrl: './header-with-btn-back.component.html',
  styleUrls: ['./header-with-btn-back.component.scss'],
})
export class HeaderWithBtnBackComponent implements OnInit {
  
  public backPath:any;
  public searchButton = true;
  public base64Image : any;
  barcode:string;
  constructor(private router: Router,private activedRoute: ActivatedRoute,
              private camera: Camera,
              private common: CommonService) {
                this.backPath = activedRoute.snapshot.data.backPath;
              }
  
  ngOnInit() {    
  }

  goBackPagebtn(){
    this.router.navigate([this.backPath]);
  }
  gotoscanBarcode(){
    this.router.navigate(['scanBarcode'])
  }
}
