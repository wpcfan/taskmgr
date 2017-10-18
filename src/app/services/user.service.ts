import { Pageable } from '../domain/pageable';
import {Inject, Injectable} from '@angular/core';
import {HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User, Project} from '../domain';

@Injectable()
export class UserService {
  private readonly domain = 'users';
  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

  constructor(@Inject('BASE_CONFIG') private config: {uri: string},
              private http: HttpClient) {
  }

  searchUsers(filter: string): Observable<User[]> {
    const uri = `${this.config.uri}/${this.domain}/search`;
    const params = new HttpParams()
      .set('filter', filter);
    return this.http.get<Pageable<User>>(uri, {params})
      .map(p => p.content);
  }
}
