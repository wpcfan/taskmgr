import { Task, Project } from '../domain';
import { createSelector } from '@ngrx/store';
import {
  covertArrToObj,
  buildObjFromArr,
  addOne,
  deleteOne,
  updateOne,
  loadCollection
} from '../utils/reduer.util';
import * as actions from '../actions/task.action';
import * as prjActions from '../actions/project.action';
import * as _ from 'lodash';

type combinedAction = actions.CompleteTaskSuccessAction | actions.MoveTaskSuccessAction | actions.UpdateTaskSuccessAction;
export interface State {
  ids: string[];
  entities: { [id: string]: Task };
}

export const initialState: State = {
  ids: [],
  entities: {}
};

const addTask = (state: State, action: actions.AddTaskSuccessAction) => {
  if (state.entities[<string>(<Task>action.payload).id]) {
    return state;
  }
  return addOne(state, <Task>action.payload);
};

const delTask = (state: State, action: actions.DeleteTaskSuccessAction) => {
  return deleteOne(state, action.payload);
};

const loadTasks = (state: State, action: actions.LoadTasksInListsSuccessAction) => {
  if ((<Task[]>action.payload).length === 0) {
    return state;
  }
  return loadCollection(state, <Task[]>action.payload);
};

const moveAllTasks = (state: State, action: actions.MoveAllSuccessAction) => {
  const tasks = <Task[]>action.payload;
  // if task is null then return the orginal state
  if (tasks === null) {
    return state;
  }
  const updatedEntities = covertArrToObj(tasks);
  return { ...state, entities: { ...state.entities, ...updatedEntities } };
};

const delTasksByPrj = (state: State, action: prjActions.DeleteProjectSuccessAction) => {
  const project = <Project>action.payload;
  const listIds = project.taskLists;
  const remainingIds = state.ids.filter(id => _.indexOf(listIds, state.entities[id].taskListId) === -1);
  const remainingEntities = buildObjFromArr(remainingIds, state.entities);
  return { ids: remainingIds, entities: remainingEntities };
};

const updateTask = (state: State, action: combinedAction) => {
  return updateOne(state, action.payload);
};

export function reducer(state = initialState, action: actions.Actions | prjActions.Actions): State {
  switch (action.type) {
    case actions.ADD_SUCCESS:
      return addTask(state, <actions.AddTaskSuccessAction>action);
    case actions.DELETE_SUCCESS:
      return delTask(state, <actions.DeleteTaskSuccessAction>action);
    case prjActions.DELETE_SUCCESS:
      return delTasksByPrj(state, <prjActions.DeleteProjectSuccessAction>action);
    case actions.MOVE_SUCCESS:
    case actions.COMPLETE_SUCCESS:
    case actions.UPDATE_SUCCESS:
      return updateTask(state, <combinedAction>action);
    case actions.LOAD_IN_LISTS_SUCCESS:
      return loadTasks(state, <actions.LoadTasksInListsSuccessAction>action);
    case actions.MOVE_ALL_SUCCESS:
      return moveAllTasks(state, <actions.MoveAllSuccessAction>action);
    default:
      return state;
  }
}

export const getEntities = (state: State): { [id: string]: Task } => state.entities;
export const getIds = (state: State): string[] => state.ids;
export const getTasks = createSelector<State, { [id: string]: Task }, string[], Task[]>(getEntities, getIds, (entities, ids) => {
  return ids.map((id: string) => entities[id]);
});
