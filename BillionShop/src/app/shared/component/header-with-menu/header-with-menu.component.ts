import { Component, EventEmitter, OnInit,OnDestroy, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header-with-menu',
  templateUrl: './header-with-menu.component.html',
  styleUrls: ['./header-with-menu.component.scss'],
})
export class HeaderWithMenuComponent implements OnInit,OnDestroy {
  private searchButton:boolean = true;
  @Output() maincontent = new EventEmitter<any>();
  constructor(private activedRoute: ActivatedRoute) { 
  }

  ngOnInit() {
    if(this.activedRoute.snapshot.data.search == "no"){
      this.searchButton = false;
    }else{
      this.searchButton = true;
    }
  }
  ngOnDestroy(){
    this.searchButton = true;
  }

}
