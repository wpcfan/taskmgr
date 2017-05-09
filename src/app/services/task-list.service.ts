import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as models from '../domain';

@Injectable()
export class TaskListService {
  private domain: string = 'classes/tasklists';
  private headers = new Headers({
    'Content-Type': 'application/json'
  })
  constructor(
    @Inject('BASE_CONFIG') private config,
    private http: Http) { 
      this.headers.append('X-LC-Id', config.LCId);
      this.headers.append('X-LC-Key', config.LCKey);
    }

  add(name: string, projectId: string): Observable<models.TaskList> {
    const uri = `${this.config.uri}/${this.domain}`;
    const taskList = {
      name: name,
      projectId: projectId
    }
    return this.http
      .post(uri, JSON.stringify(taskList), {headers: this.headers})
      .map(res => Object.assign({}, taskList, {id: res.json().objectId}));
  }

    // GET /tasklist
  get(projectId: string): Observable<models.TaskList[]>{
    const uri = `${this.config.uri}/${this.domain}`;
    const whereClause = `{"projectId": "${projectId}"}`;
    return this.http
      .get(uri, {params: {'where': whereClause}, headers: this.headers})
      .map(res => {
        const results = res.json().results;
        return results.map(tl => Object.assign({}, 
          {id: tl.objectId, name: tl.name}))
      });
  }
}
