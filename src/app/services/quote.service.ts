import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import * as models from '../domain';
@Injectable()
export class QuoteService {
  // private uri: string = 'https://api.hzy.pw/saying/v1/ciba';
  constructor(
    @Inject('BASE_CONFIG') private config,
    private http: Http) { }
  getQuote(): Observable<models.Quote>{
    const uri =  `${this.config.uri}/quotes/${Math.floor(Math.random()*9).toFixed(0)}`;
    return this.http.get(uri)
      .map(res => res.json())
  }
}
