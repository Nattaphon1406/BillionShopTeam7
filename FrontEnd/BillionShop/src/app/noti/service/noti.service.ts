import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/shared/services/env.service';
import { NotiDetail } from '../noti002/model/notiDetail';
import { NotiHeader } from '../noti001/model/notiHeader';

@Injectable({
  providedIn: 'root'
})
export class NotiService {
  constructor(
    private http: HttpClient,
    private env: EnvService) { }

    url: any = `${this.env.getBaseUrl()}`;
    getDetail(shopId: Number): Observable<NotiDetail> {
      const URL = `${this.url}/items/findItemsByShop?sh_id=${shopId}`;
      return this.http.get<NotiDetail>(URL);
    }

    getHeader(shopid: Number): Observable<NotiHeader> {
      const URL = `${this.url}/items/findNotiByShop?sh_id=${shopid}`;
      return this.http.get<NotiHeader>(URL);
    }
    
    getNotiData(): Observable<Array<any>>{
      return this.http.get<Array<any>>('../../assets/demo/notiData.json');
    }
    getNotiItem(): Observable<any>{
      return this.http.get<any>('../../assets/demo/notiItem.json');
    }
}
