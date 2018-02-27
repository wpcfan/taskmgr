import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TaskFilter } from '../domain';

@Injectable()
export class TaskFilterService {
  private readonly domain: string = 'taskFilter';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(@Inject('BASE_CONFIG') private config: { uri: string }, private http: HttpClient) {
  }

  addTaskFilter(filter: TaskFilter): Observable<TaskFilter> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.post<TaskFilter>(uri, JSON.stringify(filter), { headers: this.headers });
  }

  getTaskFilter(id: string): Observable<TaskFilter> {
    const uri = `${this.config.uri}/${this.domain}/${id}`;
    return this.http.get<TaskFilter>(uri);
  }

  updateTaskFilter(filter: TaskFilter): Observable<TaskFilter> {
    const uri = `${this.config.uri}/${this.domain}/${filter.id}`;
    return this.http
      .patch<TaskFilter>(uri, JSON.stringify(filter), { headers: this.headers });
  }
}
