import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NotiHeader02} from './model/notiHeader02';
import { NotiDetail } from './model/notiDetail';
import { NotiService } from '../service/noti.service';

@Component({
  selector: 'app-noti002',
  templateUrl: './noti002.component.html',
  styleUrls: ['./noti002.component.scss'],
})
export class Noti002Component implements OnInit {
  public notiHeader: Array<NotiHeader02> = [] as Array<NotiHeader02>;
  public notiDetail: Array<NotiDetail> = [] as Array<NotiDetail>;
  public notiData:any;
  public noti:any;
  public lengthItem : Number;
  public notiContent: NotiDetail;
  public srchNoti: any;
  public shopId : number;
  public headerNoti:any;
  public detailNoti:any;
  public date:any;
  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private NotiService: NotiService,
  ) { }

  ngOnInit(){
    this.date=this.route.snapshot.params['notiDate'];
    this.lengthItem = this.route.snapshot.params['notiamount'];
    this.NotiService.getNotiData().subscribe(res=>{
      this.noti = res as NotiHeader02[];
      this.headerNoti = this.notiHeader;
    });
    this.NotiService.getNotiItem().subscribe(res=>{
      this.notiDetail = res as NotiDetail[];
      this.detailNoti = this.notiDetail;
    });

    this.GetDataDetail();
  }

  GetDataDetail(){
    this.shopId = Number(localStorage.getItem('shopId'));
    this.NotiService.getDetail(this.shopId).subscribe(res => {
      this.notiContent = res;    
    });
  }

  btnlink(){
    this.router.navigate(['pco001/pco00102']);
  }

}
