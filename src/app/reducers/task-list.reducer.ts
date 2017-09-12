import { TaskList, Project } from '../domain';
import { createSelector } from '@ngrx/store';
import { covertArrToObj, buildObjFromArr } from '../utils/reduer.util';
import * as _ from 'lodash';
import * as actions from '../actions/task-list.action';
import * as prjActions from '../actions/project.action';

export interface State {
  ids: string[];
  entities: { [id: string]: TaskList };
  selectedIds: string[];
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedIds: []
};

const addList = (state: State, action: actions.AddTaskListSuccessAction) => {
  const taskList = <TaskList>action.payload;
  if (state.ids.indexOf(<string>taskList.id) > -1) {
    return state;
  }
  const newIds = [...state.ids, <string>taskList.id];
  const newEntities = { ...state.entities, [<string>taskList.id]: taskList };
  return {
    ids: newIds,
    entities: newEntities,
    selectedIds: [...state.selectedIds, <string>taskList.id]
  };
};

const delList = (state: State, action: actions.DeleteTaskListSuccessAction) => {
  const taskList = <TaskList>action.payload;
  const newIds = state.ids.filter(id => id !== taskList.id);
  const newEntities = buildObjFromArr(newIds, state.entities);
  const selectedIds = state.selectedIds.filter(id => id !== taskList.id);
  return {
    ids: newIds,
    entities: newEntities,
    selectedIds: selectedIds
  };
};

const delListByPrj = (state: State, action: prjActions.DeleteProjectSuccessAction) => {
  const project = <Project>action.payload;
  const taskListIds = <string[]>project.taskLists;
  const remaningIds = _.difference(state.ids, taskListIds);
  const remainingEntities = buildObjFromArr(remaningIds, state.entities);
  const selectedIds = _.difference(state.selectedIds, taskListIds);
  return {
    ids: [...remaningIds],
    entities: remainingEntities,
    selectedIds: [...selectedIds]
  };
};

const updateList = (state: State, action: actions.UpdateTaskListSuccessAction) => {
  const taskList = <TaskList>action.payload;
  const entities = { ...state.entities, [<string>taskList.id]: taskList };
  return { ...state, entities: entities };
};

const swapOrder = (state: State, action: actions.SwapOrderSuccessAction) => {
  const taskLists = <TaskList[]>action.payload;
  if (taskLists === null) {
    return state;
  }
  const updated = covertArrToObj(taskLists);
  const updatedEntities = { ...state.entities, ...updated };
  return { ...state, entities: updatedEntities };
};

const loadLists = (state: State, action: actions.LoadTaskListsSuccessAction) => {
  const taskLists = <TaskList[]>action.payload;
  // if taskList is null then return the orginal state
  if (taskLists === null) {
    return state;
  }
  const newTaskLists = taskLists.filter(taskList => !state.entities[<string>taskList.id]);
  if (newTaskLists.length === 0) {
    return state;
  }
  const newIds = newTaskLists.map(taskList => <string>taskList.id);
  const newEntities = covertArrToObj(newTaskLists);
  return {
    ids: [...state.ids, ...newIds],
    entities: { ...state.entities, ...newEntities },
    selectedIds: [...newIds]
  };
};

const selectPrj = (state: State, action: prjActions.SelectProjectAction) => {
  const selectedIds = state.ids.filter(id => state.entities[id].projectId === (<Project>action.payload).id);
  return { ...state, selectedIds: selectedIds };
};

export function reducer(state: State = initialState, action: actions.Actions | prjActions.Actions): State {
  switch (action.type) {
    case actions.ADD_SUCCESS:
      return addList(state, <actions.AddTaskListSuccessAction>action);
    case actions.DELETE_SUCCESS:
      return delList(state, <actions.DeleteTaskListSuccessAction>action);
    case actions.UPDATE_SUCCESS:
      return updateList(state, <actions.UpdateTaskListSuccessAction>action);
    case actions.SWAP_ORDER_SUCCESS:
      return swapOrder(state, <actions.SwapOrderSuccessAction>action);
    case actions.LOADS_SUCCESS:
      return loadLists(state, <actions.LoadTaskListsSuccessAction>action);
    case prjActions.SELECT:
      return selectPrj(state, <prjActions.SelectProjectAction>action);
    case prjActions.DELETE_SUCCESS:
      return delListByPrj(state, <prjActions.DeleteProjectSuccessAction>action);
    default:
      return state;
  }
}

export const getEntities = (state: State): { [id: string]: TaskList } => state.entities;
export const getIds = (state: State): string[] => state.ids;
export const getSelectedIds = (state: State): string[] => state.selectedIds;
export const getTaskLists = createSelector<State, { [id: string]: TaskList }, string[], TaskList[]>(getEntities, getIds, (entities, ids) => {
  return ids.map((id: string) => entities[id]);
});
