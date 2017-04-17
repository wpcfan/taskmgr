import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as models from '../domain';

@Injectable()
export class TaskListService {
  private domain: string = 'tasklists'
  constructor(
    private http: Http,
    @Inject('BASE_URI') private baseUri) { }

    // GET /projects
  get(projectId: string): Observable<models.TaskList[]>{
    const uri = `${this.baseUri}/${this.domain}?_embed=tasks&projectId=${projectId}`;
    return this.http.get(uri)
      .map(res => res.json() as models.TaskList[]);
  }
}
