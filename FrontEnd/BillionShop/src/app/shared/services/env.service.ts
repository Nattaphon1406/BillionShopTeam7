import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  private domain = '';
  private port = '';

  constructor() {
    this.domain = `http://192.168.137.1`;
    this.port = `8081`;
    // if (environment.production) {
    //   // this.domain = `https://wmsdashboard.com`;
    //   // this.port = `8585`;
    // } else if (environment.staging) {
    //   // this.domain = `http://wmsdashboard.com`;
    //   // this.port = `8585`;
    // }
    // // else if (environment.preuat) {
    // //   this.domain = `http://172.16.0.44`;
    // //   this.port = `8585`;
    // // }
    // else if (environment.ss) {
    //   // this.domain = `http://172.16.0.57`;
    //   // this.port = `8585`;
    // } else {
    //   this.domain = `http://localhost`;
    //   this.port = `8080`;
    // }
   }

  public getBaseUrl() {
    const semicolon = ':';
    return  `${this.domain}${semicolon}${this.port}`;
  }
}


