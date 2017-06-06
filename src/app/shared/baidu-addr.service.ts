import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

export interface BaiduAddr {
  name: string;
  location: {lat: string; lng: string},
  uid: string;
  city: string;
  district: string;
}

@Injectable()
export class BaiduAddrService {

  constructor(private http: Http) {}
  query(queryStr: string, region: string, cityLimit: boolean = true) : Observable<BaiduAddr[]> {
    const uri = `http://api.map.baidu.com/place/v2/suggestion`;
    return this.http
      .get(uri, {params: {
        query: queryStr,
        region: region,
        city_limit: cityLimit,
        output: 'json',
        ak: 'YrI82datOkRNDIiUpsiM0Ar2jZdbo240'
      }})
      .map(res => {
        const result = res.json();
        if (result.status !== 0) {
          throw new Error(result.message);
        }
        return result.result as BaiduAddr[];
      });
  }
}
