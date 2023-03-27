import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from '../../../app/shared/services/env.service';
import { Pco00101 } from '../pco001/model/pco00101';

@Injectable({
  providedIn: 'root'
})
export class Pco00101Service {

  constructor( 
    private http: HttpClient,
    private env: EnvService) { }

    url: any = `${this.env.getBaseUrl()}`;

    getPoDetailDataByPoId(poId : Number) : Observable<Pco00101>{
      const URL = `${this.url}/pco/findDetailPoByPoId?poId=${poId}`;
      return this.http.get<Pco00101>(URL);
    }

}
