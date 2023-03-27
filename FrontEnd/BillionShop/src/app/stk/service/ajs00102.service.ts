import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/shared/services/env.service';
import { genCode, getSaId, stockAdjustDetailRequest } from '../adjustStock/model/ajs00102';

@Injectable({
  providedIn: 'root'
})
export class Ajs00102Service {

  constructor(
    private http: HttpClient,
    private env: EnvService
  ) { }

  url: any = `${this.env.getBaseUrl()}`;

  InsertAdjustStockHeader(headerAdjust,shopId): Observable<getSaId> {
    const URL = `${this.url}/stock/InsertStockAdjustHeader?shopId=${shopId}`;
    return this.http.put<getSaId>(URL,headerAdjust);
  }

  InsertAdjustStockDetail(itemInsert,saId): Observable<any> {
    const URL = `${this.url}/stock/InsertStockAdjustDetail?saId=${saId}&shopId=${Number(localStorage.getItem('shopId'))}`;
    return this.http.put<any>(URL,itemInsert);
  }

  getCodeAdjustStock(): Observable<genCode> {
    const URL = `${this.url}/stock/GenCodeAdjustStock`;
    return this.http.get<genCode>(URL);
  }

  getReasonAdjustStock(): Observable<any> {
    const URL = `${this.url}/stock/FindAllReason`;
    return this.http.get<any>(URL);
  }
  
}
