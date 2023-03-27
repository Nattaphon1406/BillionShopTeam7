import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from '../../../shared/services/env.service';
import { rol001 } from '../rol001/model/rol001';
@Injectable({
  providedIn: 'root'
})
export class Rol001Service {

  constructor(
    private http: HttpClient,
    private env: EnvService) { }

  url: any = `${this.env.getBaseUrl()}`;
  getUserdata(sh_id: Number): Observable<rol001> {
    const URL = `${this.url}/log/findUserShopId?us_sh_id=${sh_id}`;
    return this.http.get<rol001>(URL);
  }

  getFindUserData(Data: String, shopId: Number): Observable<rol001> {
    const URL = `${this.url}/log/findUserByData?data=${Data}&us_sh_id=${shopId}`;
    return this.http.get<rol001>(URL);
  }

  DeleteUser(us_id: Number): Observable<rol001> {
    const URL = `${this.url}/log/DeleteUserById?us_id=${us_id}`;
    return this.http.delete<rol001>(URL);
  }

  DeleteAllUser(sh_id: Number): Observable<rol001> {
    const URL = `${this.url}/log/DeleteAllUserId?us_id=${Number(localStorage.getItem('userId'))}&us_sh_id=${sh_id}`;
    return this.http.delete<rol001>(URL);
  }

  putUserdata(createUser): Observable<rol001> {
    const URL = `${this.url}/log/CreateAccount`;
    return this.http.put<rol001>(URL, createUser);
  }
}
