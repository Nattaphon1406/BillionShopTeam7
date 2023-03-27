import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  getDemoParameterHeader(): Observable<Array<any>>{
    return this.http.get<Array<any>>('../../assets/demo/demoParameter.json');
  }

  getDemoDetailHeader(): Observable<any>{
    return this.http.get<any>('../../assets/demo/demoDetailHeader.json');
  }

  public getBarcode:string = "";
  public dataSearch:string = "";
}
