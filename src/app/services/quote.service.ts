import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Quote} from '../domain';
import {format} from 'date-fns';

@Injectable()
export class QuoteService {
  // private uri: string = 'https://api.hzy.pw/saying/v1/ciba';
  constructor(@Inject('BASE_CONFIG') private config: {uri: string},
              private http: HttpClient) {
  }

  getQuote(): Observable<Quote> {
    const uri = `${this.config.uri}/quotes/daily`;

    return this.http.get<Quote>(uri);
  }
}
