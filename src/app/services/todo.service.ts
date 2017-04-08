import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergemap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/observable/from';
import { Todo, Err, Auth, AppState } from '../domain/entities.interface';

@Injectable()
export class TodoService {
  // 定义Request Headers
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  // 定义此服务的rest api路径
  private domain: string = 'todos';
  private auth$: Observable<Auth>;

  constructor(
    private http: Http,
    @Inject('BASE_URI') private baseUri) { }

  // POST /todos
  addTodo(todo: Todo): Observable<Todo>{
    const uri = `${this.baseUri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(todo), {headers: this.headers})
      .map(res => res.json());
  }

  // PUT /todos
  toggleTodo(todo: Todo): Observable<Todo>{
    const uri = `${this.baseUri}/${this.domain}/${todo.id}`;
    return this.http
      .put(uri, JSON.stringify(todo), {headers: this.headers})
      .map(res => res.json());
  }

  // DELETE /todos
  removeTodo(todo: Todo): Observable<Todo>{
    const uri = `${this.baseUri}/${this.domain}/${todo.id}`;
    return this.http
      .delete(uri, {headers: this.headers})
      .mapTo(todo);
  }

  // GET /todos
  getTodos(userId: string): Observable<Todo[]>{
    const uri = `${this.baseUri}/${this.domain}/?userId=${userId}`;
    return this.http.get(uri).map(res => res.json());
  }

  // BATCH Update, DON'T use below in real production env
  toggleAll(userId: string): Observable<number>{
    return this.getTodos(userId)
      .mergeMap(todos => Observable.from(todos))
      .mergeMap(todo => {
        const url = `${this.baseUri}/${this.domain}/${todo.id}`;
        return this.http
          .patch(url, JSON.stringify({completed: !todo.completed}), {headers: this.headers})
          .map(res => res.json())
      })
      .reduce((acc, v, idx) => acc+idx, 1)
  }

  // BATCH Delete, DON'T use below in real production env
  clearCompleted(userId: string): Observable<number>{
    return this.getTodos(userId)
      .mergeMap(todos => Observable.from(todos))
      .mergeMap(todo => {
        const url = `${this.baseUri}/${this.domain}/${todo.id}`;
        return this.http
          .delete(url, {headers: this.headers})
          .mapTo(todo)
      })
      .reduce((acc, v, idx) => acc+idx, 1)
  }
}
