/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { EnvService } from '../env.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemDetail } from '../../model/rcv/item-detail';

import { reciveURL } from '../../constant/baseUrlByModule.constant';


@Injectable({
  providedIn: 'root'
})
export class RcvService {


  constructor(private http: HttpClient,
    private envService: EnvService) { }

    // url: any = `${this.envService.getBaseUrl()}/dsh`+ this.moduleURL as string;
    url: any = `${this.envService.getBaseUrl()}` + `${reciveURL}` as string;


    getfindItemQty(whCode: number, stkDateFrom: string, stkDateTo: string): Observable<ItemDetail> {
      const URL = `${this.url}/finditemqty/whCode=${whCode},stkDateFrom=${stkDateFrom},stkDateTo=${stkDateTo}`;
      return this.http.get<ItemDetail>(URL);
    }
}
