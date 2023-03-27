import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from '../../../app/shared/services/env.service';
import { stockReport } from "../model/pdr001";
@Injectable({
  providedIn: 'root'
})
export class Pdr001Service {
  
  constructor(
    private http: HttpClient,
    private env: EnvService
  ) { }

  url: any = `${this.env.getBaseUrl()}`;
  findStockReportById(shopId: number): Observable<stockReport> {
    const URL = `${this.url}/stock/findStockReportById?shopId=${shopId}`;
    return this.http.get<stockReport>(URL, {});

  }

  findStockReportByData(data: String): Observable<stockReport> {
    const URL = `${this.url}/stock/findStockReportByData?data=${data}&shopId=${Number(localStorage.getItem('shopId'))}`;
    return this.http.get<stockReport>(URL, {});
  }
}
