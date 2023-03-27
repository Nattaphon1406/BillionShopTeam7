
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/shared/services/env.service';
import { mmsList } from '../movementStock/model/mmsList';
@Injectable({
  providedIn: 'root'
})
export class Mms002Service {
  constructor(
    private http: HttpClient,
    private env: EnvService
  ) { }
  public mmmList: mmsList=null;
  url: any = `${this.env.getBaseUrl()}`;

  findListMovementByshopId(data,sm_date, shopId): Observable<any>{
    const URL = `${this.url}/stock/listMovementListbyId?data=${data}&shopId=${shopId}&sm_date=${sm_date}`;
    return this.http.get<any>(URL);
  }
 
}
