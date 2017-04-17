import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import { TodoService } from '../services/todo.service';
import * as actions from '../actions/todo.action';
import * as fromRoot from '../reducers';
import * as models from '../domain';

@Injectable()
export class TodoEffects{
  /**
   * 
   * @param actions$ 
   * @param todoService 
   */
  constructor(
    private actions$: Actions, 
    private todoService: TodoService,
    private store$: Store<fromRoot.State>) { }
  /**
   * 
   */
  @Effect()
  loadTodos$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOAD_TODOS)
    .map(toPayload)
    .withLatestFrom(this.store$.select(fromRoot.getAuth))
    .switchMap(([_, auth]) => {
      return this.todoService.getTodos(auth.user.id);
    })
    .map(todos => new actions.LoadTodosSuccessAction(todos))
    .catch(err => of(new actions.LoadTodosFailAction(err.json())));

  @Effect()
  addTodo$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ADD_TODO)
    .map(toPayload)
    .withLatestFrom(this.store$.select(fromRoot.getAuth))
    .switchMap(([desc, auth]) => {
      const todo: models.Todo = {
        desc: desc,
        completed: false,
        userId: auth.user.id
      };
      return this.todoService.addTodo(todo);
    })
    .map(todo => new actions.AddTodoSuccessAction(todo))
    .catch(err => of(new actions.AddTodoFailAction(err.json())));

  @Effect()
  toggle$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.TOGGLE_TODO)
    .map(toPayload)
    .switchMap(todo => this.todoService.toggleTodo(todo))
    .map(todo => new actions.ToggleTodoSuccessAction(todo))
    .catch(err => of(new actions.ToggleTodoFailAction(err.json())));
  
  @Effect()
  remove$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.REMOVE_TODO)
    .map(toPayload)
    .switchMap(todo => this.todoService.removeTodo(todo))
    .map(todo => new actions.RemoveTodoSuccessAction(todo))
    .catch(err => of(new actions.RemoveTodoFailAction(err.json())));
  
  @Effect()
  toggleAll$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.TOGGLE_ALL)
    .map(toPayload)
    .withLatestFrom(this.store$.select(fromRoot.getAuth))
    .switchMap(([_, auth]) => this.todoService.toggleAll(auth.user.id))
    .map(num => new actions.ToggleAllSuccessAction(num))
    .catch(err => of(new actions.ToggleAllFailAction(err.json())));

  @Effect()
  clearCompleted$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.CLEAR_COMPLETED)
    .map(toPayload)
    .withLatestFrom(this.store$.select(fromRoot.getAuth))
    .switchMap(([_, auth]) => this.todoService.clearCompleted(auth.user.id))
    .map(num => new actions.ClearCompletedSuccessAction(num))
    .catch(err => of(new actions.ClearCompletedFailAction(err.json())));
}