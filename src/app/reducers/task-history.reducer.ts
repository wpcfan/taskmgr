import { TaskHistory } from '../domain';
import { createSelector } from '@ngrx/store';
import { addOne } from '../utils/reduer.util';
import * as actions from '../actions/task-history.action';

export interface State {
  ids: string[];
  entities: { [id: string]: TaskHistory };
}

export const initialState: State = {
  ids: [],
  entities: {}
};

const createTaskHistory = (state: State, action: actions.CreateTaskSuccessAction) => {
  return addOne(state, action.payload);
}

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.CREATE_TASK_SUCCESS:
      return createTaskHistory(state, <actions.CreateTaskSuccessAction>action);
    default:
      return state;
  }
}

export const getEntities = (state: State): { [id: string]: TaskHistory } => state.entities;
export const getIds = (state: State): string[] => state.ids;
export const getHistory = createSelector<State, { [id: string]: TaskHistory }, string[], TaskHistory[]>(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
