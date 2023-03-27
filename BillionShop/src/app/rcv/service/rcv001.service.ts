import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from '../../../app/shared/services/env.service';
import { Rcv001_Head } from '../model/rcv00101_Head';

@Injectable({
  providedIn: 'root'
})
export class Rcv001Service {

  constructor(
    private http: HttpClient,
    private env: EnvService
  ) { }
  url: any = `${this.env.getBaseUrl()}`;

  findHeadRcvAllById(shopId: number): Observable<any> {
    const URL = `${this.url}/rcv/findHeadRcvAllById?shopId=${shopId}`;
    return this.http.get<any>(URL, {});
  }

  findRcvByData(data): Observable<any> {
    const URL = `${this.url}/rcv/findRcvByData?data=${data}&shopId=${Number(localStorage.getItem('shopId'))}`;
    return this.http.get<any>(URL, {});
  }
}
