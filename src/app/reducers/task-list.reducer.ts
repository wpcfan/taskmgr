import {TaskList, Project} from '../domain';
import {createSelector} from 'reselect';
import * as _ from 'lodash';
import * as actions from '../actions/task-list.action';
import * as prjActions from '../actions/project.action';

export interface State {
  ids: string [];
  entities: { [id: string]: TaskList };
  selectedIds: string[];
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedIds: []
};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_SUCCESS: {
      const taskList = <TaskList>action.payload;
      if (state.ids.indexOf(taskList.id) > -1) {
        return state;
      }
      const newIds = [...state.ids, taskList.id];
      const newEntities = {...state.entities, [taskList.id]: taskList};
      return {
        ids: newIds,
        entities: newEntities,
        selectedIds: [...state.selectedIds, taskList.id]
      };
    }
    case actions.ActionTypes.DELETE_SUCCESS: {
      const taskList = <TaskList>action.payload;
      const newIds = state.ids.filter(id => id !== taskList.id);
      const newEntities = newIds.reduce((entities: { [id: string]: TaskList }, id) => {
        return {...entities, [id]: state.entities[id]};
      }, {});
      const selectedIds = state.selectedIds.filter(id => id !== taskList.id);
      return {
        ids: newIds,
        entities: newEntities,
        selectedIds: selectedIds
      };
    }
    case prjActions.ActionTypes.DELETE_SUCCESS: {
      const project = <Project>action.payload;
      const taskListIds = project.taskLists;
      const remaningIds = _.difference(state.ids, taskListIds);
      const remainingEntities = remaningIds.reduce((entities: { [id: string]: TaskList }, id) => {
        return {...entities, [id]: state.entities[id]};
      }, {});
      const selectedIds = _.difference(state.selectedIds, taskListIds);
      return {
        ids: [...remaningIds],
        entities: remainingEntities,
        selectedIds: [...selectedIds]
      };
    }
    case actions.ActionTypes.UPDATE_SUCCESS: {
      const taskList = <TaskList>action.payload;
      const entities = {...state.entities, [taskList.id]: taskList};
      return {...state, entities: entities};
    }
    case actions.ActionTypes.SWAP_ORDER_SUCCESS: {
      const taskLists = <TaskList[]>action.payload;
      if (taskLists === null) {
        return state;
      }
      const updated = taskLists.reduce((entities: { [id: string]: TaskList }, taskList: TaskList) => {
        return {...entities, [taskList.id]: taskList};
      }, {});
      const updatedEntities = {...state.entities, ...updated};
      return {...state, entities: updatedEntities};
    }
    case actions.ActionTypes.LOADS_SUCCESS: {
      const taskLists = <TaskList[]>action.payload;
      // if taskList is null then return the orginal state
      if (taskLists === null) {
        return state;
      }
      const newTaskLists = taskLists.filter(taskList => !state.entities[taskList.id]);
      if (newTaskLists.length === 0) {
        return state;
      }
      const newIds = newTaskLists.map(taskList => taskList.id);
      const newEntities = newTaskLists.reduce((entities: { [id: string]: TaskList }, taskList: TaskList) => {
        return {...entities, [taskList.id]: taskList};
      }, {});
      return {
        ids: [...state.ids, ...newIds],
        entities: {...state.entities, ...newEntities},
        selectedIds: [...newIds]
      };
    }
    case prjActions.ActionTypes.SELECT: {
      const selectedIds = state.ids.filter(id => state.entities[id].projectId === (<Project>action.payload).id);
      return {...state, selectedIds: selectedIds};
    }
    case actions.ActionTypes.LOADS_FAIL:
    case actions.ActionTypes.ADD_FAIL:
    case actions.ActionTypes.UPDATE_FAIL:
    case actions.ActionTypes.DELETE_FAIL:
    default:
      return state;
  }
}

export const getEntities = (state) => state.entities;
export const getIds = (state) => state.ids;
export const getTaskLists = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
export const getSelectedIds = (state) => state.selectedIds;
