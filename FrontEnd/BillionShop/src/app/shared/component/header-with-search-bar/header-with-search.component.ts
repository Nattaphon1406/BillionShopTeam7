import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-header-with-search',
  templateUrl: './header-with-search.component.html',
  styleUrls: ['./header-with-search.component.scss'],
})
export class HeaderWithSearchComponent implements OnInit {

  @Input() HeaderName: string;
  @Output() maincontent = new EventEmitter<any>();
  @Output() Search = new EventEmitter<string>();
  
  state: boolean;

  constructor() {
    this.state = false;
  }

  ngOnInit() {

  }

  setSearch(event){
    this.Search.emit(event.target.value);
  }

  clickSearch(){
    this.state = !this.state;
    if(!this.state) this.Search.emit('');
  }

}
