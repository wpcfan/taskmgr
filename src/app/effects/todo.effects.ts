import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import { TodoService } from '../services/todo.service';
import * as todoActions from '../actions/todo.action';
import * as todoFilterActions from '../actions/todo-visibility.action';
import { Todo, Err, AppState } from '../domain/entities.interface';

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
    private store$: Store<AppState>) { }
  /**
   * 
   */
  @Effect()
  loadTodos$: Observable<Action> = this.actions$
    .ofType(todoActions.ActionTypes.LOAD_TODOS)
    .map(toPayload)
    .withLatestFrom(this.store$.select(state => state.auth))
    .switchMap(([_, auth]) => {
      return this.todoService.getTodos(auth.user.id);
    })
    .map(todos => new todoActions.LoadTodosSuccessAction(todos))
    .catch(err => of(new todoActions.LoadTodosFailAction(err.json())));

  @Effect()
  addTodo$: Observable<Action> = this.actions$
    .ofType(todoActions.ActionTypes.ADD_TODO)
    .map(toPayload)
    .withLatestFrom(this.store$.select(state => state.auth))
    .switchMap(([desc, auth]) => {
      const todo: Todo = {
        desc: desc,
        completed: false,
        userId: auth.user.id
      };
      return this.todoService.addTodo(todo);
    })
    .map(todo => new todoActions.AddTodoSuccessAction(todo))
    .catch(err => of(new todoActions.AddTodoFailAction(err.json())));

  @Effect()
  toggle$: Observable<Action> = this.actions$
    .ofType(todoActions.ActionTypes.TOGGLE_TODO)
    .map(toPayload)
    .switchMap(todo => this.todoService.toggleTodo(todo))
    .map(todo => new todoActions.ToggleTodoSuccessAction(todo))
    .catch(err => of(new todoActions.ToggleTodoFailAction(err.json())));
  
  @Effect()
  remove$: Observable<Action> = this.actions$
    .ofType(todoActions.ActionTypes.REMOVE_TODO)
    .map(toPayload)
    .switchMap(todo => this.todoService.removeTodo(todo))
    .map(todo => new todoActions.RemoveTodoSuccessAction(todo))
    .catch(err => of(new todoActions.RemoveTodoFailAction(err.json())));
  
  @Effect()
  toggleAll$: Observable<Action> = this.actions$
    .ofType(todoActions.ActionTypes.TOGGLE_ALL)
    .map(toPayload)
    .withLatestFrom(this.store$.select(state => state.auth))
    .switchMap(([_, auth]) => this.todoService.toggleAll(auth.user.id))
    .map(num => new todoActions.ToggleAllAction(num))
    .catch(err => of(new todoActions.ToggleAllFailAction(err.json())));

  @Effect()
  clearCompleted$: Observable<Action> = this.actions$
    .ofType(todoActions.ActionTypes.CLEAR_COMPLETED)
    .map(toPayload)
    .withLatestFrom(this.store$.select(state => state.auth))
    .switchMap(([_, auth]) => this.todoService.clearCompleted(auth.user.id))
    .map(num => new todoActions.ClearCompletedSuccessAction(num))
    .catch(err => of(new todoActions.ClearCompletedFailAction(err.json())));
}