import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { itemList } from '../../shared/component/itm-choose-list/item-list-model/itemList';
import { EnvService } from '../../../app/shared/services/env.service';
import { Pco00101 } from '../pco001/model/pco00101';
import { ItemId, PcoHeader, PoId } from '../pco001/model/PcoDetailItemList';


@Injectable({
  providedIn: 'root'
})
export class Pco00102Service {

  private statusPO: string = "";

  constructor(
    private http: HttpClient,
    private env: EnvService
  ) { }
  url: any = `${this.env.getBaseUrl()}`;

  genPOAuto(shopId): Observable<any> {
    const URL = `${this.url}/pco/genPOAuto?shopId=${shopId}`;
    return this.http.get<any>(URL);
  }

  genPoHead(): Observable<Pco00101> {
    const URL = `${this.url}/pco/genPoHead`;
    return this.http.get<Pco00101>(URL);
  }

  getPoHead(poId:number): Observable<PcoHeader>{
    const URL = `${this.url}/pco/FindPoHeader?poId=${poId}`;
    return this.http.get<PcoHeader>(URL);
  }

  setStatusPO(status) {
    this.statusPO = status;
  }

  getStatusPO() {
    return this.statusPO;
  }

  putPoHead(poHead): Observable<PoId> {
    const URL = `${this.url}/pco/insertPoHead`;
    return this.http.put<PoId>(URL, poHead);
  }

  putPoDetail(poDetail): Observable<any> {
    const URL = `${this.url}/pco/insertPoDetail`;
    return this.http.put<any>(URL, poDetail);
  }

  updatePoDetail(poDetail): Observable<any> {
    const URL = `${this.url}/pco/updatePoDetail`;
    return this.http.put<any>(URL, poDetail);
  }

  poDetail(poDetail): Observable<any> {
    const URL = `${this.url}/pco/poDetail`;
    return this.http.put<any>(URL, poDetail);
  }

  deletePoDetail(poDelItem): Observable<any> {
    const URL = `${this.url}/pco/deletePoDetail?pod_itm_id=${poDelItem.pod_itm_id}&po_code=${poDelItem.po_code}`;
    return this.http.delete<any>(URL);
  }

  getItemListByBarcode(data):Observable<itemList>{
    const URL = `${this.url}/items/findItemListByBarcode?data=${data}&shopId=${Number(localStorage.getItem('shopId'))}`;
    return this.http.get<itemList>(URL);
  }

  getItemIdByBarcode(data:string):Observable<ItemId>{
    const URL = `${this.url}/pco/findItmInPoByBarcode?itmBarcode=${data}&shopId=${Number(localStorage.getItem('shopId'))}`;
    return this.http.get<ItemId>(URL);
  }
}
