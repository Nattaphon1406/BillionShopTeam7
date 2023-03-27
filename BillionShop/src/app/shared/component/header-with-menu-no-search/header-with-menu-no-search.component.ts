import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParameterModel } from '../../model/common/parameter-model';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'app-header-with-menu-no-search',
  templateUrl: './header-with-menu-no-search.component.html',
  styleUrls: ['./header-with-menu-no-search.component.scss'],
})
export class HeaderWithMenuNoSearchComponent implements OnInit {

  public prmId: any;
  public header: any;
  public parameter: Array<ParameterModel> = [] as Array<ParameterModel>;
  public lang: any = 'TH';

  constructor(private activatedRoute: ActivatedRoute,
    private commonService: CommonService) {
      
    this.prmId = activatedRoute.snapshot.data.prmId;

    this.commonService.getDemoParameterHeader().subscribe( res => {
    this.parameter = res as ParameterModel[];
    this.parameter.filter(e => e.prmHdrNo === 1
      && e.prmDtlCd === this.prmId
      && e.lang === this.lang).forEach(e => {
    this.header = e.desc;
    });
    });
  
   }

  ngOnInit() {}

}
