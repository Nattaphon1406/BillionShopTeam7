import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-itm00201',
  templateUrl: './itm00201.component.html',
  styleUrls: ['./itm00201.component.scss'],
})
export class Itm00201Component implements OnInit {
  text:string;
  itemid:string;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.text =  this.route.snapshot.paramMap.get('text') || '';
    this.itemid = this.route.snapshot.paramMap.get('itemId');
   }

  ngOnInit() {
    setTimeout(() => { this.router.navigate(['itm002', { itm_id: this.itemid }]); }, 1500);
    
  }
  


  

  
}
