import { TaskHistory } from '../domain';
import { createSelector } from '@ngrx/store';
import { addOne } from '../utils/reduer.util';
import * as actions from '../actions/task-history.action';

export interface State {
  ids: string[];
  entities: { [id: string]: TaskHistory };
  taskId: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  taskId: null
};

const selectTask = (state: State, action: actions.SelectTaskAction): State => {
  const taskId: string = action.payload;

  return { ...state, taskId: taskId };
}

const loadTaskHistory = (state: State, action: actions.LoadHistorySuccessAction): State => {
  const taskHistories: TaskHistory[] = action.payload;
  if (null === taskHistories) {
    return state;
  }

  // const newIds =
  return state;
}

const createTaskHistory = (state: State, action: actions.CreateTaskSuccessAction): State => {
  const taskHistory: TaskHistory = action.payload;
  const ids: string[] = [...state.ids, <string>taskHistory.id];
  const entities: { [id: string]: TaskHistory } = { ...state.entities, [<string>taskHistory.id]: taskHistory };

  // return addOne(state, action.payload);
  return { ...state, ids: ids, entities: entities };
}

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.SELECT_TASK:
      return selectTask(state, <actions.SelectTaskAction>action);
    case actions.LOAD_SUCCESS:
      return loadTaskHistory(state, <actions.LoadHistorySuccessAction>action);
    case actions.CREATE_TASK_SUCCESS:
      return createTaskHistory(state, <actions.CreateTaskSuccessAction>action);
    default:
      return state;
  }
}

export const getEntities = (state: State): { [id: string]: TaskHistory } => state.entities;
export const getIds = (state: State): string[] => state.ids;
export const getTaskHistory = createSelector<State, { [id: string]: TaskHistory }, string[], TaskHistory[]>(getEntities, getIds, (entities, ids) => {
  return ids.map((id: string) => entities[id]);
});
