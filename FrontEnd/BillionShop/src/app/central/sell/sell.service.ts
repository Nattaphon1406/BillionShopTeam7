import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from 'src/app/shared/services/env.service';
import { sell001 } from './sell-model/sell001';
import { sellBucket } from '../sell/sell-model/sellBucket';
import { sellReceipt } from './sell-model/sellReceipt';
import { sellReceiptDetail } from './sell-model/sellReceiptDetail';
import { sellRcId } from './sell-model/sellRcId';

@Injectable({
  providedIn: 'root'
})
export class SellService {

  constructor(private http: HttpClient,
    private env: EnvService) { }

    url: any = `${this.env.getBaseUrl()}`;

    getTabldata(): Observable<Array<any>>{
      return this.http.get<Array<any>>('../../assets/demo/demoData.json');
    }
    getDefault():Observable<any>{
      return this.http.get<any>('../../assets/demo/itmDefaultImg.json')
    }

    getindItemSellByShopId():Observable<sell001>{
      const shopId = Number(localStorage.getItem('shopId'));
      const URL = `${this.url}/sell/findItemByShopId?shopId=${shopId}`;
      return this.http.get<sell001>(URL);
    }

    public Bucket:sellBucket[] = [];
    public totalPrice:number = 0;

    findItemByData(data):Observable<sell001>{
      const shopId = Number(localStorage.getItem('shopId'));
      const URL = `${this.url}/sell/findItemByData?data=${data}&shopId=${shopId}`;
      return this.http.get<sell001>(URL);
    }

    putHeaderPayment(sellInsert):Observable<sellRcId>{
      const URL = `${this.url}/sell/InsertHeaderPayment`
    return this.http.put<sellRcId>(URL,sellInsert);
    }

    putDetailPayment(Bucket,rcId,userName):Observable<any>{
      const URL = `${this.url}/sell/InsertDetailPayment?rcId=${rcId}&userName=${userName}`
    return this.http.put<any>(URL,Bucket);
    }

    findHeaderRec(rcId):Observable<sellReceipt>{
      const shopId = Number(localStorage.getItem('shopId'));
      const URL = `${this.url}/sell/findRecHeader?rcId=${rcId}&shopId=${shopId}`;
      return this.http.get<sellReceipt>(URL);
    }
    
    findDetailRec(rcId):Observable<sellReceiptDetail>{
      const URL = `${this.url}/sell/findRecDetail?rcId=${rcId}`;
      return this.http.get<sellReceiptDetail>(URL);
    }

}
