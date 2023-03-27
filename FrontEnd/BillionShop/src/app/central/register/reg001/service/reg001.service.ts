import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/shared/services/env.service';
import { reg001 } from '../model/reg001';
@Injectable({
  providedIn: 'root'
})
export class Reg001Service {

  constructor(
    private http: HttpClient,
    private env: EnvService) { }

  url: any = `${this.env.getBaseUrl()}`;
  putUserdata(createUser): Observable<reg001> {
    const URL = `${this.url}/log/CreateAccount`;
    return this.http.put<reg001>(URL, createUser);
  }
}
