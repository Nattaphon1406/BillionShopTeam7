import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/shared/services/env.service';
import { mmsList } from '../movementStock/model/mmsList';
import { mmsHeader } from '../movementStock/model/mmsHeader';

@Injectable({
  providedIn: 'root'
})
export class Mms003Service {

  constructor(
    private http: HttpClient,
    private env: EnvService
  ) { }

  url: any = `${this.env.getBaseUrl()}`;

  getMovementStockHeaderitem(): Observable<any> {
    return this.http.get<any>('../../assets/demo/mmsHeaderitem.json')
  }

  getMovementStockDetailitem(): Observable<any> {
    return this.http.get<any>('../../assets/demo/mmsDetailitem.json')
  }
  findHederMovementByshopId(sm_date, shopId,itmId): Observable<mmsHeader>{
    const URL = `${this.url}/stock/ShowHeaderMovement?itmId=${itmId}&shopId=${shopId}&smDate=${sm_date}`;
    return this.http.get<mmsHeader>(URL);
  }

  findDetailMovementByshopId(sm_date, shopId,itmId): Observable<any>{
    const URL = `${this.url}/stock/ShowDetailMovement?itmId=${itmId}&shopId=${shopId}&smDate=${sm_date}`;
    return this.http.get<any>(URL);
  }
}
