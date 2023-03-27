import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/shared/services/env.service';
import { mms001, showList } from '../movementStock/model/mms001';
 


@Injectable({
  providedIn: 'root'
})
export class Mms001Service {

  public date;
  constructor(
    private http: HttpClient,
    private env: EnvService
  ) { }

  url: any = `${this.env.getBaseUrl()}`;

  findListMovementByDate(date:mms001): Observable<showList>{
    const URL = `${this.url}/stock/ShowMovement`;
    return this.http.post<showList>(URL,date);
  }
}
