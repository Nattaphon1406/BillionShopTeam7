import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/shared/services/env.service';
import { barcodeDetail,itmBarcode,itmModeldata,itm002 } from '../model/ItemModel';
@Injectable({
  providedIn: 'root'
})
export class Imt002Service {

  constructor(
    private http: HttpClient,
    private env: EnvService) { }

  url: any = `${this.env.getBaseUrl()}`;
  getItemCode(): Observable<itm002> {
    const URL = `${this.url}/items/findLastItemId`;
    return this.http.get<itm002>(URL);
  }

  getItemById(itm_id): Observable<itmModeldata> {
    const URL = `${this.url}/items/findItemsById?itm_id=${itm_id}`
    return this.http.get<itmModeldata>(URL);
  }

  getBarcodeByItemId(itemId): Observable<itmBarcode> {
    const URL = `${this.url}/items/findBarcodeItemByItemId?itemId=${itemId}`
    return this.http.get<itmBarcode>(URL);
  }

  putItemData(itemInsert): Observable<any> {
    const URL = `${this.url}/items/InsertItm`
    return this.http.put<any>(URL, itemInsert);
  }

  updateItemData(itemUpdate): Observable<any> {
    const URL = `${this.url}/items/UpdateItmById`;
    return this.http.put<any>(URL, itemUpdate);
  }

  putItemBarcode(itemCode,userName,BarcodeRequest){
    const URL = `${this.url}/items/AddBarcode?itemCode=${itemCode}&userName=${userName}`;
    return this.http.put<any>(URL, BarcodeRequest);
  }

  deleteItemBarcode(itemCode,itemBarcode): Observable<void>{
    const URL = `${this.url}/items/DeleteBarcode?itemBarcode=${itemBarcode}&itemCode=${itemCode}`;
    return this.http.delete<void>(URL);
  }

   getBarcodeBSS(): Observable<itmBarcode>{
    const URL = `${this.url}/items/findBarcodeBss?barcodeType=2&shopId=${localStorage.getItem('shopId')}`;
    return  this.http.get<itmBarcode>(URL);
  }
  public deleteBarcode:barcodeDetail[] = null;
  public AddBarcode:barcodeDetail[] = null;
  public itemName:String = "";
  public itemCode:String = "";
  public keyitemBarcode:number =-1;
}
