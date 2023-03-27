import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from '../../shared/services/env.service';

@Injectable({
  providedIn: 'root'
})
export class Rol001Service {

  constructor(    
    private http: HttpClient,
    private env: EnvService) { }

    getTabldata(): Observable<Array<any>>{
      return this.http.get<Array<any>>('../../../assets/demo/demoData.json');
    }
    getDefault():Observable<any>{
      return this.http.get<any>('../../../assets/demo/itmDefaultImg.json')
    }
    getDataDemo(){}
    createDataDemo(){}
    deleteDataDemo(){}
    updateDataDemo(){}
}
