import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TaskFilter } from '../domain';

@Injectable()
export class TaskFilterService {
  private readonly domain: string = 'taskFilter';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor( @Inject('BASE_CONFIG') private config: { uri: string }, private http: HttpClient) {
  }

  addTaskFilter(filter: TaskFilter): Observable<TaskFilter> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.post<TaskFilter>(uri, JSON.stringify(filter), { headers: this.headers });
  }

  getTaskFilter(projectId: string): Observable<TaskFilter> {
    const uri = `${this.config.uri}/${this.domain}`;
    const params = new HttpParams()
      .set('projectId', projectId);

    return this.http.get<TaskFilter[]>(uri, { params })
      .map((res: TaskFilter[]) => res[0]);
  }
}
