import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Todo, AppState } from '../../domain/entities.interface';
import * as todoActions from '../../actions/todo.action';
import * as todoFilterActions from '../../actions/todo-visibility.action';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todos$: Observable<Todo[]>;
  constructor(private store$: Store<AppState>) { 
    this.todos$ = this.store$.select(state => state.todos);
  }

  ngOnInit() {
    this.store$.dispatch({type: todoActions.ActionTypes.LOAD_TODOS});
  }

  addTodo(desc: string){
    this.store$.dispatch({type: todoActions.ActionTypes.ADD_TODO, payload: desc});
  }

  toggleAll(){
    this.store$.dispatch({type: todoActions.ActionTypes.TOGGLE_ALL});
  }

  removeTodo(todo: Todo){
    this.store$.dispatch({type: todoActions.ActionTypes.REMOVE_TODO, payload: todo});
  }

  toggleTodo(todo: Todo){
    this.store$.dispatch({type: todoActions.ActionTypes.TOGGLE_TODO, payload: todo});
  }
}
