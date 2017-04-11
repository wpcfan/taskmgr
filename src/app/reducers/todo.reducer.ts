import * as entities from '../domain';
import { createSelector } from 'reselect';
import * as todoActions from '../actions/todo.action';

export interface State{
  todos: entities.Todo[],
  visibilityFilter: string;
}

const initialState: State = {
  todos: [],
  visibilityFilter: 'ALL'
};

export function reducer(
  state = initialState, action: todoActions.Actions): State {
  switch (action.type) {
    case todoActions.ActionTypes.ADD_TODO_SUCCESS:
      return Object.assign({}, state, {todos: [...state.todos, action.payload]});
    case todoActions.ActionTypes.REMOVE_TODO_SUCCESS:
      return Object.assign({}, state, 
      {todos: state.todos.filter(todo => todo.id !== action.payload.id)});
    case todoActions.ActionTypes.TOGGLE_TODO_SUCCESS:
      const todos_toggle = state.todos.map(todo => {
        if(todo.id === action.payload.id) {
          return Object.assign({}, todo, {completed: action.payload.completed});
        } else {
          return todo;
        }
      });
      return Object.assign({}, state, {todos: todos_toggle});
    case todoActions.ActionTypes.TOGGLE_ALL_SUCCESS:
      return Object.assign({}, state, 
      {todos: state.todos.map(todo => Object.assign({}, todo, {completed: !todo.completed}))});
    case todoActions.ActionTypes.LOAD_TODOS_SUCCESS:
      return Object.assign({}, state, {todos: [...action.payload]});
    case todoActions.ActionTypes.CLEAR_COMPLETED_SUCCESS:
      return Object.assign({}, state, {todos: state.todos.filter(todo => !todo.completed)});
    case todoActions.ActionTypes.SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {visibilityFilter: action.payload});
    case todoActions.ActionTypes.LOAD_TODOS_FAIL:
    case todoActions.ActionTypes.TOGGLE_TODO_FAIL:
    case todoActions.ActionTypes.TOGGLE_ALL_FAIL:
    case todoActions.ActionTypes.ADD_TODO_FAIL:
    case todoActions.ActionTypes.REMOVE_TODO_FAIL:
    default:
      return state;
  }
}

export const getVisibilityFilter = (state: State) => state.visibilityFilter
export const getTodos = (state) => state.todos

export const getVisibleTodos = createSelector(
  [getVisibilityFilter, getTodos], (filter, todos)=>{
    switch (filter) {
      case 'ACTIVE':
        return todos.filter(t => !t.completed);
      case 'COMPLETED':
        return todos.filter(t => t.completed);
      case 'ALL':
      default:
        return todos;
    }
  })