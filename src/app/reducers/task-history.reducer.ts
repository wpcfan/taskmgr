import { TaskHistory } from '../domain';
import { TaskVM } from '../vm';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as actions from '../actions/task-history.action';
import * as taskActions from '../actions/task.action';

export interface State extends EntityState<TaskHistory> {
  selectedTask: TaskVM | null;
  updatedTask: TaskVM | null;
}

export const adapter: EntityAdapter<TaskHistory> = createEntityAdapter<TaskHistory>({
});

export const initialState: State = adapter.getInitialState({
  selectedTask: null,
  updatedTask: null,
});

export function reducer(state = initialState, action: actions.Actions | taskActions.Actions): State {
  switch (action.type) {
    case taskActions.SELECT:
      return { ids: [], entities: {}, selectedTask: action.payload, updatedTask: null };
    case taskActions.UPDATING:
      return { ...state, updatedTask: action.payload };
    case actions.LOAD_SUCCESS:
      return { ...adapter.addAll(action.payload, state) };
    case actions.ADD_SUCCESS:
      return { ...adapter.addOne(action.payload, state) };
    default:
      return state;
  }
}

export const getSelectedTask = (state: State): TaskVM | null => state.selectedTask;
export const getUpdatedTask = (state: State): TaskVM | null => state.updatedTask;
