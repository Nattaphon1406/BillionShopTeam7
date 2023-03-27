import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pco00101Service } from '../../service/pco00101.service';
import { Pco00102Service } from '../../service/pco00102.service';
import { Pco00101 } from '../model/pco00101';

@Component({
  selector: 'app-pco00101',
  templateUrl: './pco00101.component.html',
  styleUrls: ['./pco00101.component.scss'],
})
export class Pco00101Component implements OnInit {
  public itms: Pco00101;
  public srchItms: any;
  public poCode: string;
  public poDate: string;
  public poGenUser: string;
  public poStatus: string;
  public poId : number;
  
  constructor(
    private pco00101Service: Pco00101Service,
    private pco00102Service:Pco00102Service,
    private route: ActivatedRoute,
  ) { 
    this.poId = Number(this.route.snapshot.paramMap.get('poId'));
  }

  ngOnInit() {
    this.getParam();
    this.getPoDetailByPoId();
  }

  getPoDetailByPoId(){
    this.pco00101Service.getPoDetailDataByPoId(this.poId).subscribe(res => {
      this.itms = res;
      this.srchItms = this.itms; 
    });
  }

  getParam(){
    this.pco00102Service.getPoHead(this.poId).subscribe(ref =>{
      this.poCode = ref[0].poCode;
      this.poGenUser = ref[0].poGenUser;
      this.poStatus = ref[0].poStatus;
      this.poDate = ref[0].poDate;
    });
  }
}
