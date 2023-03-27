import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/shared/services/env.service';

@Injectable({
  providedIn: 'root'
})
export class Ajs001Service {

  constructor(
    private http: HttpClient,
    private env: EnvService
  ) { }

  url: any = `${this.env.getBaseUrl()}`;

  getAdjustStockHeader(shopId): Observable<any> {
    const URL = `${this.url}/stock/findStockAdjustHeadAllByShopId?shopId=${shopId}`;
    return this.http.get<any>(URL);
  }

  findStockAdjustByData(data, shopId): Observable<any> {
    const URL = `${this.url}/stock/findStockAdjustByData?data=${data}&shopId=${shopId}`;
    return this.http.get<any>(URL);
  }

}
