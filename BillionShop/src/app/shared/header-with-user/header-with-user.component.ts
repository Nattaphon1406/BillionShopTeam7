import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/services/common/common.service';
import { HeaderDetail } from '../model/TestHeader/Testparaheader';

@Component({
  selector: 'app-header-with-user',
  templateUrl: './header-with-user.component.html',
  styleUrls: ['./header-with-user.component.scss'],
})
export class HeaderWithUserComponent implements OnInit {
  public username : any;
  public shopName : any;
  constructor(  private CommonService: CommonService) { }

  ngOnInit() {
    this.username = localStorage.getItem('userName');
    this.shopName = localStorage.getItem("shopName");
  }

}
