import * as models from '../domain';
import { createSelector } from 'reselect';
import * as actions from '../actions/task.action';

export interface State{
  tasks: models.Task[];
}

const initialState: State = {
  tasks: []
};

export function reducer(
  state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_TASK:
      return Object.assign({}, state, 
      {tasks: [...state.tasks, action.payload]});
    case actions.ActionTypes.DELETE_TASK_SUCCESS:
      return Object.assign({}, state, 
      {tasks: state.tasks.filter(t => t.id !== action.payload.id)});
    case actions.ActionTypes.UPDATE_TASK:
      const t_update = state.tasks.map(t => {
        if(t.id === action.payload.id) {
          return Object.assign({}, action.payload);
        } else {
          return t;
        }
      });
      return Object.assign({}, state, {tasks: t_update});
    case actions.ActionTypes.LOAD_TASKS_SUCCESS:
      return Object.assign({}, state, {tasks: [...action.payload]});
    case actions.ActionTypes.LOAD_TASKS_FAIL:
    case actions.ActionTypes.ADD_TASK_FAIL:
    case actions.ActionTypes.UPDATE_TASK_FAIL:
    case actions.ActionTypes.DELETE_TASK_FAIL:
    default:
      return state;
  }
}

export const getTasks = (state) => state.tasks;