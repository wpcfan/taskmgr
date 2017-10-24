import { TaskFilter } from '../domain';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { getDefaultTaskFilter } from '../utils/task-filter.util';
import * as actions from '../actions/task-filter.action';
import * as projectActions from '../actions/project.action';

export const initialState: TaskFilter = getDefaultTaskFilter();

export function reducer(state = initialState, action: actions.Actions | projectActions.Actions): TaskFilter {
  switch (action.type) {
    case actions.LOAD_SUCCESS:
      return { ...action.payload };
    case actions.UPDATE_SUCCESS:
      return { ...action.payload };
    default:
      return state;
  }
}
