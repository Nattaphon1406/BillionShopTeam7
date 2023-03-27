import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/shared/services/env.service';
import { itemList } from '../item-list-model/itemList';

@Injectable({
  providedIn: 'root'
})
export class ItmChooseListService {

  constructor(
    private http: HttpClient,
    private env: EnvService) { }

  url: any = `${this.env.getBaseUrl()}`;
    getTabldata(): Observable<Array<any>>{
      return this.http.get<Array<any>>('../../../assets/demo/demoData.json');
    }
    getDefault():Observable<any>{
      return this.http.get<any>('../../../assets/demo/itmDefaultImg.json')
    }

    findItemList(): Observable<itemList>{
      const URL = `${this.url}/items/findItemListByShopId?shopId=${Number(localStorage.getItem("shopId"))}`;
      return this.http.get<itemList>(URL);
    }

    findItemListByData(data): Observable<itemList>{
      const URL = `${this.url}/items/findItemListByData?data=${data}&shopId=${Number(localStorage.getItem("shopId"))}`;
      return this.http.get<itemList>(URL);
    }

    listItem:itemList = null;

    getDataDemo(){}
    createDataDemo(){}
    deleteDataDemo(){}
    updateDataDemo(){}
}
