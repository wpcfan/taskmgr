import {TaskList} from '../domain';
import {createSelector} from 'reselect';
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
      const ids = [...state.ids, taskList.id];
      const entities = Object.assign({}, state.entities, {[taskList.id]: taskList});
      return Object.assign({}, state, {
        ids: ids,
        entities: entities,
        selectedId: [...state.selectedIds, taskList.id]
      });
    }
    case actions.ActionTypes.DELETE_SUCCESS: {
      const taskList = <TaskList>action.payload;
      const ids = state.ids.filter(id => id !== taskList.id);
      const entities = ids.reduce((entities: { [id: string]: TaskList }, id) => {
        return Object.assign(entities, {
          [id]: state.entities[id]
        });
      }, {});
      const selectedIds = state.selectedIds.filter(id => id !== taskList.id);
      return Object.assign({}, state, {
        ids: ids,
        entities: entities,
        selectedIds: selectedIds
      });
    }
    case actions.ActionTypes.UPDATE_SUCCESS: {
      const taskList = <TaskList>action.payload;
      const entities = Object.assign({}, state.entities, {[taskList.id]: taskList});
      return Object.assign({}, state, {entities: entities});
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
        return Object.assign(entities, {
          [taskList.id]: taskList
        });
      }, {});
      return {
        ids: [...state.ids, ...newIds],
        entities: Object.assign({}, state.entities, newEntities),
        selectedIds: [...newIds]
      };
    }
    case prjActions.ActionTypes.SELECT: {
      const selectedIds = state.ids.filter(id => state.entities[id].projectId === action.payload.id);
      return Object.assign({}, state, {selectedIds: selectedIds});
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
