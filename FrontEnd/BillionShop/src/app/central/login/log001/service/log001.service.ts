import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/shared/services/env.service';
import { log001 } from '../model/log001';

@Injectable({
  providedIn: 'root'
})
export class Log001Service {

  constructor(
    private http: HttpClient,
    private env: EnvService) { }

    url: any = `${this.env.getBaseUrl()}`;
    getLogindata(user_name : string, user_password : string) : Observable<log001> {
      const URL = `${this.url}/log/finduserpass?us_pass_word=${user_password}&us_user_name=${user_name}`;
      return this.http.get<log001>(URL);
    }
  }
