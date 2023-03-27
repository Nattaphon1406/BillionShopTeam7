import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/shared/services/env.service';
import { Rcv00101_Head } from '../model/rcv00101_Head';
import { Rcv00101_Detail } from '../model/rcv00101_Detail';


@Injectable({
  providedIn: 'root'
})
export class Rcv00101Service {

  constructor(
    private http: HttpClient,
    private env: EnvService) { }

  url: any = `${this.env.getBaseUrl()}`;
  findDetailRcvById(riId: Number) {
    const URL = `${this.url}/rcv/findDetailRcvById?riId=${riId}`;
    return this.http.get<Rcv00101_Detail>(URL, {});
  }
}
