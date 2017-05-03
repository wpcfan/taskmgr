import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/observable/from';
import * as models from '../domain';
import * as wilddog from 'wilddog';

@Injectable()
export class ProjectService {
  // 定义Request Headers
  private headers: Headers = new Headers({
    'Content-Type': 'application/json;charset=UTF-8'
  });
  // 定义此服务的rest api路径
  private domain: string = 'projects';
  private auth$: Observable<models.Auth>;

  constructor(
    private http: Http,
    @Inject('BASE_URI') private baseUri) { }

  // POST /projects
  add(project: models.Project): Observable<models.Project>{
    const ref = wilddog.sync().ref("/projects");
    const prjToAdd = Object.assign(
      {}, 
      project, 
      {enabled: true, archived: false});
    return Observable.from(
      ref.push(prjToAdd).then(newRef => 
        Object.assign({}, prjToAdd, {id: newRef.key()})));
    // return this.http
    //   .post(uri, JSON.stringify(prjToAdd), {headers: this.headers})
    //   .map(res => res.json());
  }

  // PUT /projects
  update(project: models.Project): Observable<models.Project>{
    const ref = wilddog.sync().ref("/projects").child(project.id);
    return Observable.from(ref.update(project));
    // const uri = `${this.baseUri}/${this.domain}/${project.id}`;
    // const updated = Object.assign({}, {name: project.name, desc: project.desc});
    // return this.http
    //   .patch(uri, JSON.stringify(updated), {headers: this.headers})
    //   .map(res => updated);
  }

  // PATCH /projects instead of deleting the records
  delete(project: models.Project): Observable<models.Project>{
    const uri = `${this.baseUri}/${this.domain}/${project.id}`;
    const deleted = Object.assign({}, {enabled: false});
    return this.http
      .patch(uri, JSON.stringify(deleted), {headers: this.headers})
      .map(res => res.json());
  }

  // GET /projects
  get(userId: string): Observable<{[id: string]: models.Project}>{
    const auth = wilddog.auth();
    const token = auth.currentUser.getToken();
    const uri = `${this.baseUri}/${this.domain}.json?orderBy="enabled"&equalTo=true&auth=${token}`;
    return this.http.get(uri)
      .map(res => res.json() as {[id: string]: models.Project});
  }
}
