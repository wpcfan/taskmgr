import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergemap';
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
    return this.http
      .post(uri, JSON.stringify(project), {headers: this.headers})
      .map(res => res.json());
  }

  // PUT /projects
  update(project: entities.Project): Observable<entities.Project>{
    const uri = `${this.baseUri}/${this.domain}/${project.id}`;
    const updated = Object.assign({}, project);
    return this.http
      .put(uri, JSON.stringify(updated), {headers: this.headers})
      .map(res => updated);
  }

  // DELETE /projects
  delete(project: entities.Project): Observable<entities.Project>{
    const uri = `${this.baseUri}/${this.domain}/${project.id}`;
    return this.http
      .delete(uri, {headers: this.headers})
      .mapTo(project);
  }

  // GET /projects
  get(userId: string): Observable<entities.Project[]>{
    const uri = `${this.baseUri}/${this.domain}`;
    return this.http.get(uri)
      .map(res => res.json() as entities.Project[])
      .map(prjs => prjs.filter(prj => 
        prj.memberIds.filter(id => id === userId).length > 0));
  }
}
