import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from '../../shared/services/env.service';
import { searchReport } from '../model/sso001';


@Injectable({
  providedIn: 'root'
})
export class ReportService {
  

  constructor(
    private http: HttpClient,
    private env: EnvService,
  ) { }

  url: any = `${this.env.getBaseUrl()}`;

  getSaleReportData(shopId: Number):Observable<any>{
    const URL = `${this.url}/report/findSalesReportById?shopId=${shopId}`;
    return this.http.get<any>(URL);
  }

  getFindSalesReportData(dataSearch:searchReport):Observable<any> {
    const URL = `${this.url}/report/findSalesReportByData`;
    return this.http.post<any>(URL,dataSearch);
    
  }
}
