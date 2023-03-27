import { AfterViewChecked, Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParameterModel } from '../../model/common/parameter-model';
import { CommonService } from '../../services/common/common.service';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit,DoCheck {

  public prmId: any;
  public fil: any;
  public header: any;
  public parameter: Array<ParameterModel> = [] as Array<ParameterModel>;
  public lang: any = 'TH';
  public val:string = "";

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

  ngDoCheck()
  {
    
    if(this.commonService.getBarcode != ''){
      this.val = this.commonService.getBarcode;
      this.commonService.getBarcode = '';
      
    }else{
      this.val = this.commonService.dataSearch;
    }
    
  }
   
   ngOnInit() {
   
  }
}

   




