import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from '../../shared/services/env.service';
import { ItmDetail001 } from '../model/ItemModel';
@Injectable({
  providedIn: 'root'
})
export class Itm001Service {

  constructor(    
    private http: HttpClient,
    private env: EnvService) { }

    url: any = `${this.env.getBaseUrl()}`;
    getFindItemData(data :String ,shopId : Number) : Observable<ItmDetail001>{
      const URL = `${this.url}/items/findItems?data=${data}&shopId=${shopId}`;
      return this.http.get<ItmDetail001>(URL);
    }

    getItemDatabyShopId(shopId : Number) : Observable<ItmDetail001>{
      const URL = `${this.url}/items/findItemByShopId?shopId=${shopId}`;
      return this.http.get<ItmDetail001>(URL);
    }

    getDefault():Observable<any>{
      return this.http.get<any>('../../assets/demo/itmDefaultImg.json');
    }
}
