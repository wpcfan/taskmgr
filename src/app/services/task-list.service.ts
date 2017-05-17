import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { concat } from 'rxjs/observable/concat';
import { Project, TaskList } from '../domain';

@Injectable()
export class TaskListService {
  private domain: string = 'tasklists';
  private headers = new Headers({
    'Content-Type': 'application/json'
  })
  constructor(
    @Inject('BASE_CONFIG') private config,
    private http: Http) { }

  add(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(taskList), {headers: this.headers})
      .map(res => res.json());
  }

  update(taskList: TaskList): Observable<TaskList>{
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    return this.http
      .put(uri, JSON.stringify(taskList), {headers: this.headers})
      .map(res => res.json());
  }

  delete(taskList: TaskList): Observable<TaskList>{
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    return this.http
      .delete(uri)
      .mapTo(taskList);
  }

    // GET /tasklist
  get(projectId: string): Observable<TaskList[]>{
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'projectId': projectId}, headers: this.headers})
      .map(res => res.json());
  }

  swapOrder(drag: TaskList, drop: TaskList): Observable<TaskList[]>{
    const dragUri = `${this.config.uri}/${this.domain}/${drag.id}`;
    const dropUri = `${this.config.uri}/${this.domain}/${drop.id}`;
    const drag$ = this.http
      .patch(dragUri, JSON.stringify({order: drag.order}), {headers: this.headers})
      .map(res => res.json());
    const drop$ = this.http
      .patch(dropUri, JSON.stringify({order: drop.order}), {headers: this.headers})
      .map(res => res.json());
    return concat(drag$, drop$).reduce((r,x)=> {
              return [...r, x];
            },[]);
  }

  initializeTaskLists(prj: Project): Observable<Project>{
    const id = prj.id;
    return concat(
      this.add({name: '待办', projectId: id, order: 1}), 
      this.add({name: '进行中', projectId: id, order: 2}),
      this.add({name: '已完成', projectId: id, order: 3}))
      .reduce((r,x)=> {
        return [...r, x];
      },[])
      .map(tls => Object.assign({}, prj, {taskLists: tls.map(tl=>tl.id)}))
  }
}
