import {Task} from '../domain';
import {createSelector} from 'reselect';
import * as actions from '../actions/task.action';

export interface State {
  ids: string[];
  entities: { [id: string]: Task };
  loading: boolean;
}

export const initialState: State = {
  ids: [],
  entities: {},
  loading: false,
};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.ActionTypes.LOAD:
    case actions.ActionTypes.DELETE:
    case actions.ActionTypes.UPDATE:
    case actions.ActionTypes.ADD:
      return Object.assign({}, state, {loading: true});
    case actions.ActionTypes.ADD_SUCCESS: {
      const task = <Task>action.payload;
      if (state.entities[task.id]) {
        return state;
      }
      const newIds = [...state.ids, task.id];
      const newEntities = Object.assign({}, state.entities, {[task.id]: task});
      return Object.assign({}, state, {ids: newIds, entities: newEntities, loading: false});
    }
    case actions.ActionTypes.DELETE_SUCCESS: {
      const task = <Task>action.payload;
      const newIds = state.ids.filter(id => id !== task.id);
      const newEntities = newIds.reduce((entities: { [id: string]: Task }, id) => {
        return Object.assign(entities, {
          [id]: state.entities[id]
        });
      }, {});
      return Object.assign({}, state, {ids: newIds, entities: newEntities, loading: false});
    }
    case actions.ActionTypes.MOVE_SUCCESS:
    case actions.ActionTypes.COMPLETE_SUCCESS:
    case actions.ActionTypes.UPDATE_SUCCESS: {
      const task = <Task>action.payload;
      const entities = Object.assign({}, state.entities, {[task.id]: task});
      return Object.assign({}, state, {entities: entities, loading: false});
    }
    case actions.ActionTypes.LOAD_SUCCESS: {
      const tasks = <Task[]>action.payload;
      // if task is null then return the orginal state
      if (tasks === null) {
        return state;
      }
      const newTasks = tasks.filter(task => !state.entities[task.id]);
      const newIds = newTasks.map(task => task.id);
      const newEntities = newTasks.reduce((entities: { [id: string]: Task }, task) => {
        return Object.assign(entities, {
          [task.id]: task
        });
      }, {});
      return Object.assign({}, state, {
        ids: [...state.ids, ...newIds],
        entities: Object.assign({}, state.entities, newEntities),
        loading: false
      });
    }
    case actions.ActionTypes.COMPLETE_FAIL:
    case actions.ActionTypes.MOVE_FAIL:
    case actions.ActionTypes.LOAD_FAIL:
    case actions.ActionTypes.ADD_FAIL:
    case actions.ActionTypes.UPDATE_FAIL:
    case actions.ActionTypes.DELETE_FAIL:
      return Object.assign({}, state, {loading: false});
    default:
      return state;
  }
}

export const getEntities = (state) => state.entities;
export const getIds = (state) => state.ids;
export const getLoading = (state) => state.loading;
export const getTasks = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
