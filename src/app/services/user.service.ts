import { Inject, Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Project } from '../domain';
import { from } from 'rxjs';
import { switchMap, filter, reduce } from 'rxjs/operators';

@Injectable()
export class UserService {
  private readonly domain = 'users';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    @Inject('BASE_CONFIG') private config: { uri: string },
    private http: HttpClient
  ) {}

  searchUsers(filterStr: string): Observable<User[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    const params = new HttpParams().set('email_like', filterStr);
    return this.http.get<User[]>(uri, { params });
  }

  getUsersByProject(projectId: string): Observable<User[]> {
    const uri = `${this.config.uri}/users`;
    const params = new HttpParams().set('projectId', projectId);
    return this.http.get<User[]>(uri, { params });
  }

  addProjectRef(user: User, projectId: string): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = user.projectIds ? user.projectIds : [];
    return this.http.patch<User>(
      uri,
      JSON.stringify({ projectIds: [...projectIds, projectId] }),
      { headers: this.headers }
    );
  }

  removeProjectRef(user: User, projectId: string): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = user.projectIds ? user.projectIds : [];
    const index = projectIds.indexOf(projectId);
    const toUpdate = [
      ...projectIds.slice(0, index),
      ...projectIds.slice(index + 1)
    ];
    return this.http.patch<User>(
      uri,
      JSON.stringify({ projectIds: toUpdate }),
      { headers: this.headers }
    );
  }

  batchUpdateProjectRef(project: Project): Observable<User[]> {
    const projectId = <string>project.id;
    const memberIds = project.members ? project.members : [];
    return from(memberIds).pipe(
      switchMap(id => {
        const uri = `${this.config.uri}/${this.domain}/${id}`;
        return this.http.get(uri);
      }),
      filter(
        (user: User) =>
          user.projectIds ? user.projectIds.indexOf(projectId) < 0 : false
      ),
      switchMap((u: User) => this.addProjectRef(u, projectId)),
      reduce((users: User[], curr: User) => [...users, curr], [])
    );
  }
}
