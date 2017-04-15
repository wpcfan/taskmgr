import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/observable/from';
import * as entities from '../domain';

@Injectable()
export class ProjectService {
  // 定义Request Headers
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  // 定义此服务的rest api路径
  private domain: string = 'projects';
  private auth$: Observable<entities.Auth>;

  constructor(
    private http: Http,
    @Inject('BASE_URI') private baseUri) { }

  // POST /projects
  add(project: entities.Project): Observable<entities.Project>{
    const uri = `${this.baseUri}/${this.domain}`;
    const prjToAdd = Object.assign({}, project, {enabled: true, archived: false})
    return this.http
      .post(uri, JSON.stringify(prjToAdd), {headers: this.headers})
      .map(res => res.json());
  }

  // PUT /projects
  update(project: entities.Project): Observable<entities.Project>{
    const uri = `${this.baseUri}/${this.domain}/${project.id}`;
    const updated = Object.assign({}, {name: project.name, desc: project.desc});
    return this.http
      .patch(uri, JSON.stringify(updated), {headers: this.headers})
      .map(res => updated);
  }

  // PATCH /projects instead of deleting the records
  delete(project: entities.Project): Observable<entities.Project>{
    const uri = `${this.baseUri}/${this.domain}/${project.id}`;
    const deleted = Object.assign({}, {enabled: false});
    return this.http
      .patch(uri, JSON.stringify(deleted), {headers: this.headers})
      .map(res => res.json());
  }

  // GET /projects
  get(userId: string): Observable<entities.Project[]>{
    const uri = `${this.baseUri}/${this.domain}/?enabled=true&archived=false`;
    return this.http.get(uri)
      .map(res => res.json() as entities.Project[])
      .map(prjs => prjs.filter(prj => 
        prj.memberIds.filter(id => id === userId).length > 0));
  }
}
