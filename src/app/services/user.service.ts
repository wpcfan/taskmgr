import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { User } from "../domain";

@Injectable()
export class UserService {
  private domain ='users';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  constructor(
    @Inject('BASE_CONFIG') private config,
    private http: Http){}


  getAllUsers(): Observable<User[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get(uri)
      .map(res => res.json() as User[]);
  }

  addProjectRef(user: User, projectId: string): Observable<User>{
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = (user.projectIds)? user.projectIds : [];
    return this.http
      .patch(uri, JSON.stringify({projectIds: [...projectIds, projectId]}), {headers: this.headers})
      .map(res => res.json() as User);
  }

  removeProjectRef(user: User, projectId: string): Observable<User>{
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = (user.projectIds)? user.projectIds : [];
    const index = projectIds.indexOf(projectId);
    return this.http
      .patch(uri, JSON.stringify({projectIds: [...projectIds.slice(0, index), projectIds.slice(index)]}), {headers: this.headers})
      .map(res => res.json() as User);
  }
}