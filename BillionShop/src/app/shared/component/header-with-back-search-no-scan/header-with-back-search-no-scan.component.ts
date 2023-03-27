import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParameterModel } from '../../model/common/parameter-model';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'app-header-with-back-search-no-scan',
  templateUrl: './header-with-back-search-no-scan.component.html',
  styleUrls: ['./header-with-back-search-no-scan.component.scss'],
})
export class HeaderWithBackSearchNoScanComponent implements OnInit {
  public backPath:any;
  public prmId: any;
  public header: any;
  public parameter: Array<ParameterModel> = [] as Array<ParameterModel>;
  public lang: any = 'TH';
  constructor(private router: Router,private activedRoute: ActivatedRoute,private commonService: CommonService) {
    this.prmId = activedRoute.snapshot.data.prmId;
    this.backPath = activedRoute.snapshot.data.backPath;
    
    this.commonService.getDemoParameterHeader().subscribe( res => {
      this.parameter = res as ParameterModel[];
      this.parameter.filter(e => e.prmHdrNo === 1
        && e.prmDtlCd === this.prmId
        && e.lang === this.lang).forEach(e => {
      this.header = e.desc;
      });
      });
 }
 goBackPagebtn(){
  this.router.navigate([this.backPath]);
  }
  ngOnInit() {}

}
