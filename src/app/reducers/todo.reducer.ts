import { Todo } from '../domain/entities.interface';
import * as todoActions from '../actions/todo.action';
import * as todoFilterActions from '../actions/todo-visibility.action';

const initialState: Todo[] = [];

export function todoReducer(state = initialState, action: todoActions.Actions): Todo[] {
  switch (action.type) {
    case todoActions.ActionTypes.ADD_TODO_SUCCESS:
      return [...state, action.payload];
    case todoActions.ActionTypes.REMOVE_TODO_SUCCESS:
      return state.filter(todo => todo.id !== action.payload.id);
    case todoActions.ActionTypes.TOGGLE_TODO_SUCCESS:
      return state.map(todo => {
        if(todo.id !== action.payload.id){
          return todo;
        }
        return Object.assign({}, todo, {completed: !todo.completed});
      });
    case todoActions.ActionTypes.TOGGLE_ALL_SUCCESS:
      return state.map(todo => {
        return Object.assign({}, todo, {completed: !todo.completed});
      });
    case todoActions.ActionTypes.LOAD_TODOS_SUCCESS:
      return [
        ...action.payload
      ];
    case todoActions.ActionTypes.CLEAR_COMPLETED_SUCCESS:
      return state.filter(todo => !todo.completed);
    case todoActions.ActionTypes.LOAD_TODOS_FAIL:
    case todoActions.ActionTypes.TOGGLE_TODO_FAIL:
    case todoActions.ActionTypes.TOGGLE_ALL_FAIL:
    case todoActions.ActionTypes.ADD_TODO_FAIL:
    case todoActions.ActionTypes.REMOVE_TODO_FAIL:
    default:
      return state;
  }
}

export function todoFilterReducer (state = (todo: Todo) => todo, action: todoFilterActions.Actions): Todo {
  switch (action.type) {
    case todoFilterActions.ActionTypes.VISIBILITY_ALL_TODOS:
      return todo => todo;
    case todoFilterActions.ActionTypes.VISIBILITY_ACTIVE_TODOS:
      return todo => !todo.completed;
    case todoFilterActions.ActionTypes.VISIBILITY_COMPLETED_TODOS:
      return todo => todo.completed;
    default:
      return state;
  }
}