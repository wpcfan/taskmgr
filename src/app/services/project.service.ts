import {Inject, Injectable} from '@angular/core';
import {HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';
import {Project, User} from '../domain';
import { Pageable } from '../domain/pageable';

@Injectable()
export class ProjectService {
  private readonly domain = 'projects';
  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

  constructor(@Inject('BASE_CONFIG') private config: {uri: string},
              private http: HttpClient) {
    // this.headers.append('X-LC-Id', config.LCId);
    // this.headers.append('X-LC-Key', config.LCKey);
  }

  // POST /projects
  add(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post<Project>(uri, JSON.stringify(project), {headers: this.headers});
  }

  // PUT /projects
  update(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    const toUpdate = {
      name: project.name,
      coverImg: project.coverImg,
      desc: project.desc
    };
    return this.http
      .patch<Project>(uri, JSON.stringify(toUpdate), {headers: this.headers});
  }

  // DELETE /projects instead of deleting the records
  del(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    return this.http.delete(uri).map(_ => project);
  }

  // GET /projects
  get(): Observable<Project[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get<Pageable<Project>>(uri, {headers: this.headers})
      .map(page => page.content);
  }

  updateTaskLists(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    const toUpdate = {
      taskListIds: project.taskListIds
    };
    return this.http
      .patch<Project>(uri, JSON.stringify(toUpdate), {headers: this.headers});
  }

  inviteMembers(projectId: string, userIds: String[]) {
    const uri = `${this.config.uri}/${this.domain}/${projectId}`;
    console.log('userIds: ' + JSON.stringify(userIds));

    return this.http
      .post<Project>(uri, JSON.stringify({memberIds: userIds}), {headers: this.headers});
  }
}
