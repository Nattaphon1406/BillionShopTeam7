import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from '../../../app/shared/services/env.service';

@Injectable({
  providedIn: 'root'
})
export class Demo001Service {

  constructor(
    private http: HttpClient,
    private env: EnvService
    ) { }

    getTabldata(): Observable<Array<any>>{
      return this.http.get<Array<any>>('../../assets/demo/demoData.json');
    }

    getDataDemo(){}
    createDataDemo(){}
    deleteDataDemo(){}
    updateDataDemo(){}
}
