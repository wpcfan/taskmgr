import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/observable/from';
import * as models from '../domain';

@Injectable()
export class ProjectService {
  private domain: string = 'classes/projects';
  private headers = new Headers({
    'Content-Type': 'application/json'
  })
  constructor(
    @Inject('BASE_CONFIG') private config,
    private http: Http) { 
      this.headers.append('X-LC-Id', config.LCId);
      this.headers.append('X-LC-Key', config.LCKey);
    }

  // POST /projects
  add(project: models.Project): Observable<models.Project>{
    const uri =  `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(project), {headers: this.headers})
      .map(res => Object.assign({}, project, {id: res.json().objectId}));
  }

  // PUT /projects
  update(project: models.Project): Observable<models.Project>{
    const uri =  `${this.config.uri}/${this.domain}/${project.id}`;
    return this.http
      .put(uri, JSON.stringify(project), {headers: this.headers})
      .map(_ => project);
  }

  // DELETE /projects instead of deleting the records
  delete(project: models.Project): Observable<models.Project>{
    const uri =  `${this.config.uri}/${this.domain}/${project.id}`;
    return this.http
      .delete(uri, {headers: this.headers})
      .map(_ => project);
  }

  // GET /projects
  get(userId: string): Observable<models.Project[]>{
    const uri =  `${this.config.uri}/${this.domain}`;
    const whereClause = `{"members": "${userId}"}`;
    return this.http
      .get(uri, {params: {'where': whereClause}, headers: this.headers})
      .map(res => {
        const results = res.json().results;
        return results.map(p => Object.assign({}, 
          {id: p.objectId, name: p.name, desc: p.desc, taskLists:[...p.taskLists], members:[...p.members]}))
      });
  }
}
