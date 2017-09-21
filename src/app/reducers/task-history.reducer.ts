import { Task, TaskHistory } from '../domain';
import { createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as actions from '../actions/task-history.action';
import * as taskActions from '../actions/task.action';

export interface State extends EntityState<TaskHistory> {
  selectedTask: Task | null;
}

export const adapter: EntityAdapter<TaskHistory> = createEntityAdapter<TaskHistory>({
});

export const initialState: State = adapter.getInitialState({
  selectedTask: null
});

/*const selectTask = (state: State, action: taskActions.SelectTaskAction): State => {
  const task: Task = action.payload;

  return { ids: [], entities: {}, selectedTask: task };
}

const loadTaskHistories = (state: State, action: actions.LoadHistorySuccessAction): State => {
  const taskHistories: TaskHistory[] = action.payload;
  if (taskHistories.length === 0) {
    return state;
  }

  const newTaskHistories = taskHistories.filter(taskHistory => {
    if (!state.selectedTask) {
      return false;
    }

    return taskHistory.taskId === state.selectedTask.id;
  })
  const newIds: string[] = newTaskHistories.map(taskHistory => <string>taskHistory.id);
  const newEntities = covertArrToObj(newTaskHistories);

  return {
    ids: [...state.ids, ...newIds],
    entities: { ...state.entities, ...newEntities },
    selectedTask: state.selectedTask
  }
}

const addTaskHistory = (state: State, action: actions.AddTaskHistorySuccessAction): State => {
  const taskHistory: TaskHistory = action.payload;
  const ids: string[] = [...state.ids, <string>taskHistory.id];
  const entities: { [id: string]: TaskHistory } = { ...state.entities, [<string>taskHistory.id]: taskHistory };

  return { ...state, ids: ids, entities: entities };
}*/

export function reducer(state = initialState, action: actions.Actions | taskActions.Actions): State {
  switch (action.type) {
    case taskActions.SELECT:
      // return selectTask(state, <taskActions.SelectTaskAction>action);
      return { ids: [], entities: {}, selectedTask: action.payload };
    case actions.LOAD_SUCCESS:
      // return loadTaskHistories(state, <actions.LoadHistorySuccessAction>action);
      return adapter.addAll(action.payload, state);
    case actions.ADD_SUCCESS:
      // return addTaskHistory(state, <actions.AddTaskHistorySuccessAction>action);
      return adapter.addOne(action.payload, state);
    default:
      return state;
  }
}

export const getSelectedTask = (state: State): Task | null => state.selectedTask;
