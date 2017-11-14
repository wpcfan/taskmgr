import { TaskHistory } from '../domain';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as actions from '../actions/project-history.action';
import * as taskHistoryActions from '../actions/task-history.action';

export interface State extends EntityState<TaskHistory> {
}

export const adapter: EntityAdapter<TaskHistory> = createEntityAdapter<TaskHistory>({
});

export const initialState: State = adapter.getInitialState({
});

export function reducer(state = initialState, action: actions.Actions | taskHistoryActions.Actions): State {
  switch (action.type) {
    case actions.LOAD_SUCCESS:
      return { ...adapter.addAll(action.payload, state) };
    case taskHistoryActions.ADD_SUCCESS:
      return { ...adapter.addOne(action.payload, state) };
    default:
      return state;
  }
}
