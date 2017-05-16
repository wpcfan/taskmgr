import * as models from '../domain';
import { createSelector } from 'reselect';
import * as actions from '../actions/task.action';

export interface State{
  ids: string[];
  entities: {[id: string]: models.Task};
  loading: boolean;
}

const initialState: State = {
  ids: [],
  entities: {},
  loading: false,
};

export function reducer(
  state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.ActionTypes.LOAD:
    case actions.ActionTypes.DELETE:
    case actions.ActionTypes.UPDATE:
    case actions.ActionTypes.ADD:
      return Object.assign({}, state, {loading: true});
    case actions.ActionTypes.ADD_SUCCESS:{
      const task = <models.Task>action.payload;
      const ids = [...state.ids, task.id];
      const entities = Object.assign({}, state.entities, {[task.id]: task});
      return Object.assign({}, state, {ids: ids, entities: entities, loading: false});
    }
    case actions.ActionTypes.DELETE_SUCCESS:{
      const task = <models.Task>action.payload;
      const ids = state.ids.filter(id => id !== task.id);
      const entities = ids.reduce((entities: { [id: string]: models.Task }, id) => {
        return Object.assign(entities, {
          [id]: state.entities[id]
        })
      },{});
      return Object.assign({}, state, {ids: ids, entities: entities, loading: false});
    }
    case actions.ActionTypes.UPDATE_SUCCESS:{
      const task = <models.Task>action.payload;
      const entities = Object.assign({}, state.entities, {[task.id]: task});
      return Object.assign({}, state, {entities: entities, loading: false});
    }
    case actions.ActionTypes.LOAD_SUCCESS:{
      const task = <models.Task[]>action.payload;
      // if task is null then return the orginal state
      if(task === null) return state; 
      const entities = task.reduce((entities: { [id: string]: models.Task }, task) => {
        return Object.assign(entities, {
          [task.id]: task
        })
      },{});
      return Object.assign({}, state, 
        {ids: task.map(task => task.id), entities: entities, loading: false});
    }
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