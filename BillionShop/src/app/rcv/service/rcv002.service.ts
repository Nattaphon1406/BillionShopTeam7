import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from '../../../app/shared/services/env.service';
import { Rcv00101_Head, RcvId } from '../model/rcv00101_Head';

@Injectable({
  providedIn: 'root'
})
export class rcv002Service {

  constructor(
    private http: HttpClient,
    private env: EnvService
  ) { }

  url: any = `${this.env.getBaseUrl()}`;

  genRcvHead(): Observable<Rcv00101_Head> {
    const URL = `${this.url}/rcv/genRcvHead`;
    return this.http.get<Rcv00101_Head>(URL);
  }

  findDetailPcoByCode(poId): Observable<any> {
    const URL = `${this.url}/pco/findDetailPcoByCode?poId=${poId}`;
    return this.http.get<any>(URL);
  }

  putRcvHead(rcvHead): Observable<RcvId> {
    const URL = `${this.url}/rcv/insertReceiveHead`;
    return this.http.put<RcvId>(URL, rcvHead);
  }

  rcvDetail(rcvDetail, checkSave): Observable<any> {
    const URL = `${this.url}/rcv/rcvDetail?checkSave=${checkSave}`;
    return this.http.put<any>(URL, rcvDetail);
  }

  deleteRcvDetail(riDelItem): Observable<any> {
    const URL = `${this.url}/rcv/deleteRcvDetail?rid_itm_id=${riDelItem.rid_itm_id}&ri_code=${riDelItem.ri_code}`;
    return this.http.delete<any>(URL);
  }

  findHeadRcvById(riId): Observable<any> {
    const URL = `${this.url}/rcv/findHeadRcvById?riId=${riId}`;
    return this.http.get<any>(URL);
  }
}
