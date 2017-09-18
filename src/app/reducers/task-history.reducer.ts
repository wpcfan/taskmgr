import { Task, TaskHistory } from '../domain';
import { createSelector } from '@ngrx/store';
import { addOne, covertArrToObj, buildObjFromArr } from '../utils/reduer.util';
import * as actions from '../actions/task-history.action';
import * as taskActions from '../actions/task.action';

export interface State {
  ids: string[];
  entities: { [id: string]: TaskHistory };
  task: Task | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  task: null
};

const selectTask = (state: State, action: taskActions.SelectTaskAction): State => {
  const task: Task = action.payload;

  return { ids: [], entities: {}, task: task };
}

const loadTaskHistories = (state: State, action: actions.LoadHistorySuccessAction): State => {
  const taskHistories: TaskHistory[] = action.payload;
  if (taskHistories.length === 0) {
    return state;
  }

  const newTaskHistories = taskHistories.filter(taskHistory => {
    if (!state.task) {
      return false;
    }

    return taskHistory.taskId === state.task.id;
  })
  const newIds: string[] = newTaskHistories.map(taskHistory => <string>taskHistory.id);
  const newEntities = covertArrToObj(newTaskHistories);

  return {
    ids: [...state.ids, ...newIds],
    entities: { ...state.entities, ...newEntities },
    task: state.task
  }
}

const addTaskHistory = (state: State, action: actions.AddTaskHistorySuccessAction): State => {
  const taskHistory: TaskHistory = action.payload;
  const ids: string[] = [...state.ids, <string>taskHistory.id];
  const entities: { [id: string]: TaskHistory } = { ...state.entities, [<string>taskHistory.id]: taskHistory };

  // return addOne(state, action.payload);
  return { ...state, ids: ids, entities: entities };
}

export function reducer(state = initialState, action: actions.Actions | taskActions.Actions): State {
  switch (action.type) {
    case taskActions.SELECT:
      return selectTask(state, <taskActions.SelectTaskAction>action);
    case actions.LOAD_SUCCESS:
      return loadTaskHistories(state, <actions.LoadHistorySuccessAction>action);
    case actions.ADD_SUCCESS:
      return addTaskHistory(state, <actions.AddTaskHistorySuccessAction>action);
    default:
      return state;
  }
}

export const getEntities = (state: State): { [id: string]: TaskHistory } => state.entities;
export const getIds = (state: State): string[] => state.ids;
export const getTaskHistories = createSelector<State, { [id: string]: TaskHistory }, string[], TaskHistory[]>(getEntities, getIds, (entities, ids) => {
  return ids.map((id: string) => entities[id]);
});
