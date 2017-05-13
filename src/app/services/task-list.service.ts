import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/concat';
import * as models from '../domain';

@Injectable()
export class TaskListService {
  private domain: string = 'tasklists';
  private headers = new Headers({
    'Content-Type': 'application/json'
  })
  constructor(
    @Inject('BASE_CONFIG') private config,
    private http: Http) { }

  add(name: string, projectId: string): Observable<models.TaskList> {
    const uri = `${this.config.uri}/${this.domain}`;
    const taskList = {
      name: name,
      projectId: projectId
    };
    return this.http
      .post(uri, JSON.stringify(taskList), {headers: this.headers})
      .map(res => res.json());
  }

  update(taskList: models.TaskList): Observable<models.TaskList>{
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    return this.http
      .put(uri, JSON.stringify(taskList), {headers: this.headers})
      .map(res => res.json());
  }

  delete(taskList: models.TaskList): Observable<models.TaskList>{
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    return this.http
      .delete(uri)
      .mapTo(taskList);
  }

    // GET /tasklist
  get(projectId: string): Observable<models.TaskList[]>{
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'projectId': projectId}, headers: this.headers})
      .map(res => res.json());
  }

  swapOrder(drag: models.TaskList, drop: models.TaskList): Observable<boolean>{
    const dragUri = `${this.config.uri}/${this.domain}/${drag.id}`;
    const dropUri = `${this.config.uri}/${this.domain}/${drop.id}`;
    return this.http
      .patch(dragUri, JSON.stringify({order: drop.order}))
      .map(res => res.json())
      .switchMap(_ => this.http.patch(dropUri, JSON.stringify({order: drag.order})))
      .map(res => res.json())
      .mapTo(true);
  }
}
