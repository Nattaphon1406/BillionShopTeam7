import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvService } from 'src/app/shared/services/env.service';
import { Rcv004 } from '../model/rcv004'; 
import { Rcv004_re } from '../model/rcv004_re';
@Injectable({
  providedIn: 'root'
})
export class Rcv004Service {

  constructor(
    private http: HttpClient,
    private env: EnvService
  ) {
     
   }
   
  url: any = `${this.env.getBaseUrl()}`;
  

  getPoDataByShopId(shopId: Number, statusRcv: String): Observable<Rcv004> {
    const URL = `${this.url}/pco/findPoByShopId?searchInStatus=${statusRcv}&shopId=${shopId}`;
    return this.http.get<Rcv004>(URL);
  }
  getFindPoData(data: String, shopId: Number) {
    const URL = `${this.url}/pco/findPoByData?data=${data}&shopId=${shopId}`;
    return this.http.get<Rcv004>(URL);
  }
  putPoHeadData(poCreateBy: String, poGenUser: String, shopId: Number,) {
    const URL = `${this.url}/pco/genPoHead?poCreateBy=${poCreateBy}&shopId=${shopId}&poGenUser=${poGenUser}`;
    return this.http.put<Rcv004>(URL, {});
  }
  getRcvDataByShopId(shopId: Number, data: String): Observable<Rcv004_re> {
    const URL = `${this.url}/rcv/findPoByData?searchInrcv=${data}&shopId=${shopId}`;
    return this.http.get<Rcv004_re>(URL);
  }

}
