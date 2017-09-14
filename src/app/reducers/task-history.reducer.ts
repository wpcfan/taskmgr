import { TaskHistory } from '../domain';
import { createSelector } from '@ngrx/store';
import { addOne, covertArrToObj, buildObjFromArr } from '../utils/reduer.util';
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

  return { ids: [], entities: {}, taskId: taskId };
}

const loadTaskHistories = (state: State, action: actions.LoadHistorySuccessAction): State => {
  const taskHistories: TaskHistory[] = action.payload;
  if (taskHistories.length === 0) {
    return state;
  }

  const newTaskHistories = taskHistories.filter(taskHistory => taskHistory.taskId === state.taskId);
  const newIds: string[] = newTaskHistories.map(taskHistory => <string>taskHistory.id);
  const newEntities = covertArrToObj(newTaskHistories);

  return {
    ids: [...state.ids, ...newIds],
    entities: { ...state.entities, ...newEntities },
    taskId: state.taskId
  }
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
      return loadTaskHistories(state, <actions.LoadHistorySuccessAction>action);
    case actions.CREATE_TASK_SUCCESS:
      return createTaskHistory(state, <actions.CreateTaskSuccessAction>action);
    default:
      return state;
  }
}

export const getEntities = (state: State): { [id: string]: TaskHistory } => state.entities;
export const getIds = (state: State): string[] => state.ids;
export const getTaskHistories = createSelector<State, { [id: string]: TaskHistory }, string[], TaskHistory[]>(getEntities, getIds, (entities, ids) => {
  return ids.map((id: string) => entities[id]);
});
