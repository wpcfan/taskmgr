import { Task, User } from '../domain';
import { createSelector } from 'reselect';
import * as actions from '../actions/task-form.action';

export interface State{
  taskListId: string;
  owner: User;
  paticipants: User[];
  task: Task;
  order: number;
}

export const initialState: State = {
  taskListId: null,
  owner: null,
  paticipants: [],
  task: null,
  order: -1,
};

export function reducer(
  state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.ActionTypes.PREPARE_ADD_SUCCESS:{
      const data = action.payload;
      return {
        taskListId: data.taskListId,
        owner: Object.assign({}, data.owner),
        paticipants: [...data.paticipants],
        task: null,
        order: data.order,
      }
    }
    case actions.ActionTypes.PREPARE_UPDATE_SUCCESS:{
      const data = action.payload;
      return {
        task: Object.assign({}, data.task),
        paticipants: [...data.paticipants],
        owner: Object.assign({}, data.owner),
        taskListId: data.taskListId,
        order: data.order,
      }
    }
    default:
      return state;
  }
}