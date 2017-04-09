import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as entities from '../../domain';
import * as fromRoot from '../../reducers';
import * as todoActions from '../../actions/todo.action';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todos$: Observable<entities.Todo[]>;
  constructor(private store$: Store<fromRoot.State>) { 
    this.todos$ = this.store$.select(fromRoot.getVisibleTodos);
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

  removeTodo(todo: entities.Todo){
    this.store$.dispatch({type: todoActions.ActionTypes.REMOVE_TODO, payload: todo});
  }

  toggleTodo(todo: entities.Todo){
    this.store$.dispatch({type: todoActions.ActionTypes.TOGGLE_TODO, payload: todo});
  }

  clearCompleted(){
    this.store$.dispatch({type: todoActions.ActionTypes.CLEAR_COMPLETED});
  }

  applyFilter(value: number){
    switch (value) {
      case 1:
        this.store$.dispatch({type: todoActions.ActionTypes.SET_VISIBILITY_FILTER, payload: 'ACTIVE'})
        break;
      case 2:
        this.store$.dispatch({type: todoActions.ActionTypes.SET_VISIBILITY_FILTER, payload: 'COMPLETED'})
        break;
      case 0:
      default:
        this.store$.dispatch({type: todoActions.ActionTypes.SET_VISIBILITY_FILTER, payload: 'ALL'})
        break;
    }
  }
}
