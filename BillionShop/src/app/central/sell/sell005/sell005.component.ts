import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { SellService } from '../sell.service';
import { sellReceipt } from '../sell-model/sellReceipt';
import { sellReceiptDetail } from '../sell-model/sellReceiptDetail';


@Component({
  selector: 'app-rec001',
  templateUrl: './sell005.component.html',
  styleUrls: ['./sell005.component.scss'],
})

export class Sell005Component implements OnInit {

  public rec:sellReceipt;
  public recDetail:sellReceiptDetail;
  public rcId:Number=1;
  public rcDate:String;

  constructor(
    private navCon: NavController,    
    private router: Router,
    private sellService: SellService,
    private route: ActivatedRoute
    ) {
  }

  ngOnInit() {
    this.rcId = parseInt(this.route.snapshot.paramMap.get('rcId'));
    console.log(this.rcId);
    this.getHeaderRec(this.rcId);
    this.getDetailRec(this.rcId);
  }

  getHeaderRec(rcId:Number){ 
    this.sellService.findHeaderRec(rcId).subscribe(res=>{
      this.rec = res;
    });
  }

  getDetailRec(rcId:Number){
    this.sellService.findDetailRec(rcId).subscribe(res=>{
      this.recDetail = res; 
    });
  }

  

  goBack() {
    this.navCon.back();
  }

  backToSell(){
    this.router.navigate(['sell']);
  }

}
