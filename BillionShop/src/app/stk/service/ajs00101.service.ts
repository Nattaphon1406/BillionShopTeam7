import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/shared/services/env.service';

@Injectable({
  providedIn: 'root'
})
export class Ajs00101Service {

  constructor(
    private http: HttpClient,
    private env: EnvService
  ) { }

  url: any = `${this.env.getBaseUrl()}`;

  getAdjustStockHeaderBySaId(saId, shopId): Observable<any> {
    const URL = `${this.url}/stock/findStockAdjustHeadBySaId?saId=${saId}&shopId=${shopId}`;
    return this.http.get<any>(URL);
  }

  getAdjustStockDetail(saId): Observable<any> {
    const URL = `${this.url}/stock/findStockAdjustDetailBySaId?saId=${saId}`;
    return this.http.get<any>(URL);
  }

}
