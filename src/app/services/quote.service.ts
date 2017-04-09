import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import * as entities from '../domain';
@Injectable()
export class QuoteService {
  private uri: string = 'https://api.hzy.pw/saying/v1/ciba';
  constructor(private http: Http) { }
  getQuote(): Observable<entities.Quote>{
    return this.http.get(this.uri)
      .map(res => res.json())
  }
}
