import { TaskFilter } from '../domain';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as actions from '../actions/task-filter.action';
import * as projectActions from '../actions/project.action';

const getDefaultFilter = (): TaskFilter => {
  return {
    priorities: [],
  }
}

export interface State {
  id: string | null;
  filter: TaskFilter;
}

export const initialState: State = {
  id: null,
  filter: getDefaultFilter(),
};

export function reducer(state = initialState, action: actions.Actions | projectActions.Actions): State {
  switch (action.type) {
    case projectActions.SELECT:
      return { id: <string>action.payload.id, filter: getDefaultFilter() };
    case actions.UPDATE:
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

export const getTaskFilter = (state: State): TaskFilter => state.filter;
