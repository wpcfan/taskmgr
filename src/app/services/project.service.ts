import {Inject, Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/observable/from';
import {Project, Task, User} from '../domain';

@Injectable()
export class ProjectService {
  private domain = 'projects';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(@Inject('BASE_CONFIG') private config,
              private http: Http) {
    // this.headers.append('X-LC-Id', config.LCId);
    // this.headers.append('X-LC-Key', config.LCKey);
  }

  // POST /projects
  add(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(project), {headers: this.headers})
      .map(res => res.json());
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
      .patch(uri, JSON.stringify(toUpdate), {headers: this.headers})
      .map(res => res.json());
  }

  // DELETE /projects instead of deleting the records
  del(project: Project): Observable<Project> {
    const deltask$ = Observable.from(project.taskLists)
      .mergeMap(listId => this.http
        .get(`${this.config.uri}/tasks`, {params: {'taskListId': listId}})
        .map(res => res.json()))
      .mergeMap(tasks => Observable.from(tasks))
      .mergeMap((task: Task) => this.http
        .delete(`${this.config.uri}/tasks/${task.id}`)
        .mapTo(task))
      .reduce((tasks, t) => [...tasks, t], []);
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    return deltask$.switchMap(_ => this.http
      .delete(uri, {headers: this.headers})
      .map(_ => project));
  }

  // GET /projects
  get(userId: string): Observable<Project[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'members_like': userId}, headers: this.headers})
      .map(res => res.json());
  }

  updateTaskLists(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    const toUpdate = {
      taskLists: project.taskLists
    };
    return this.http
      .patch(uri, JSON.stringify(toUpdate), {headers: this.headers})
      .map(res => res.json());
  }

  inviteMembers(projectId: string, users: User[]) {
    const uri = `${this.config.uri}/${this.domain}/${projectId}`;

    return this.http
      .get(uri)
      .map(res => res.json() as Project)
      .switchMap(project => {
        const existingMemberIds = project.members;
        const userIds = users.map(user => user.id);
        const remainingIds = existingMemberIds.filter(id => userIds.indexOf(id) < 0);
        const newIds = [...remainingIds, ...userIds];
        return this.http.patch(uri, JSON.stringify({ members: newIds }), {headers: this.headers});
      })
      .map(res => res.json());
  }
}
