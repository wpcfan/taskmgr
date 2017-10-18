import {Pageable} from '../domain/pageable';
import {Inject, Injectable} from '@angular/core';
import {HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Task, User, TaskList} from '../domain';

@Injectable()
export class TaskService {
  private readonly domain = 'tasks';
  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

  constructor(@Inject('BASE_CONFIG') private config: {uri: string},
              private http: HttpClient) {
  }

  add(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}`;
    const toAdd = {
      taskListId: task.taskListId,
      desc: task.desc,
      completed: task.completed,
      ownerId: task.ownerId,
      participantIds: task.participantIds,
      dueDate: task.dueDate,
      priority: task.priority,
      remark: task.remark,
      reminder: task.reminder,
      createDate: task.createDate
    };
    // const addTaskRef$ = this.addTaskRef()
    return this.http
      .post<Task>(uri, JSON.stringify(toAdd), {headers: this.headers});

  }

  update(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    const toUpdate = {
      desc: task.desc,
      ownerId: task.ownerId,
      participantIds: task.participantIds,
      dueDate: task.dueDate,
      reminder: task.reminder,
      priority: task.priority,
      remark: task.remark
    };
    return this.http
      .patch<Task>(uri, JSON.stringify(toUpdate), {headers: this.headers});
  }

  del(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    return this.http
      .delete(uri)
      .mapTo(task);
  }

  // GET /tasklist
  get(taskListId: string): Observable<Task[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    const params = new HttpParams()
      .set('taskListId', taskListId)
    return this.http
      .get<Pageable<Task>>(uri, {params: params})
      .map(p => p.content);
  }

  getByLists(lists: TaskList[]): Observable<Task[]> {
    return Observable.from(lists)
      .mergeMap((list: TaskList) => this.get(<string>list.id))
      .reduce((tasks: Task[], t: Task[]) => [...tasks, ...t], []);
  }

  moveAll(srcListId: string, targetListId: string): Observable<Task[]> {
    const uri = `${this.config.uri}/${this.domain}/moveAll`;
    const params = new HttpParams()
      .append('srcListId', srcListId)
      .append('targetListId', targetListId);
    return this.http
      .patch<Task[]>(uri, null, {headers: this.headers, params: params});
  }

  move(taskId: string, taskListId: string): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${taskId}/move/${taskListId}`;
    return this.http
      .patch<Task>(uri, null, {headers: this.headers});
  }

  complete(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}/toggle`;
    return this.http
      .patch<Task>(uri, undefined, {headers: this.headers});
  }
}
