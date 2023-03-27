import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from '../../../app/shared/services/env.service';
import { Pco001 } from '../pco001/model/pco001';

@Injectable({
  providedIn: 'root'
})
export class Pco001Service {

  constructor(
    private http: HttpClient,
    private env: EnvService
  ) { }

  url: any = `${this.env.getBaseUrl()}`;

  getPoDataByShopId(shopId: Number, statusRcv: String): Observable<any> {
    const URL = `${this.url}/pco/findPoByShopId?searchInStatus=${statusRcv}&shopId=${shopId}`;
    return this.http.get<any>(URL);
  }
  getFindPoData(data: String, shopId: Number) {
    const URL = `${this.url}/pco/findPoByData?data=${data}&shopId=${shopId}`;
    return this.http.get<Pco001>(URL);
  }

}
