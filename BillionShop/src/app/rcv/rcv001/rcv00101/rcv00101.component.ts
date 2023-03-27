import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { Rcv00101_Detail } from '../../model/rcv00101_Detail';
import { Rcv00101_Head } from '../../model/rcv00101_Head';
import { Rcv00101Service } from '../../service/rcv00101.service';

@Component({
  selector: 'app-rcv00101',
  templateUrl: './rcv00101.component.html',
  styleUrls: ['./rcv00101.component.scss'],
})
export class Rcv00101Component implements OnInit {

  public ri: Rcv00101_Head;
  public rid: Rcv00101_Detail
  public srchRc: any;
  public srchItms: any;
  public shopId: Number = 1;
  public riId: Number
  riCode: String;
  riDate: String;
  poCode: String;
  riGenUser: String;
  riStatus: String;

  constructor(
    private router: ActivatedRoute,
    private rcv00101Service: Rcv00101Service
  ) { }

  ngOnInit() {
    this.router.paramMap.subscribe((params: ParamMap) => {
      this.riId = Number(params.get("riId"));
      this.riCode = (params.get("riCode"));
      this.riGenUser = (params.get("riGenUser"));
      this.poCode = (params.get("poCode"));
      this.riStatus = (params.get("riStatus"));
      this.riDate = (params.get("riDate"));
      this.rcv00101Service.findDetailRcvById(this.riId).subscribe(res => {
        this.rid = res;
        this.srchItms = this.rid;
      });
    });
  }

}
