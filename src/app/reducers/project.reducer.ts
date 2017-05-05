import * as models from '../domain';
import { createSelector } from 'reselect';
import * as actions from '../actions/project.action';

export interface State{
  ids: string[];
  entities: { [id: string]: models.Project };
  selectedId: string | null;
}

const initialState: State = {
  ids: [],
  entities: {},
  selectedId: null
};

export function reducer(
  state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_PROJECT_SUCCESS: {
      const project = action.payload;
      const ids = [...state.ids, project.id];
      const entities = Object.assign({}, state.entities, {[project.id]: project})
      return Object.assign({}, state, {ids: ids, entities: entities});
    }
    case actions.ActionTypes.DELETE_PROJECT_SUCCESS: {
      const project = action.payload;
      const ids = state.ids.filter(id => id !== project.id);
      const entities = ids.reduce((entities: { [id: string]: models.Project }, id) => {
        return Object.assign(entities, {
          [id]: state.entities[id]
        })
      },{});
      return Object.assign({}, state, {ids: ids, entities: entities});
    }
    case actions.ActionTypes.UPDATE_PROJECT_SUCCESS: {
      const project = action.payload;
      const entities = Object.assign({}, state.entities, {[project.id]: project});
      return Object.assign({}, state, {entities: entities});
    }
    case actions.ActionTypes.LOAD_PROJECTS_SUCCESS:{
      const projects = action.payload;
      // if projects is null then return the orginal state
      if(projects === null) return state; 
      const entities = projects.reduce((entities: { [id: string]: models.Project }, project) => {
        return Object.assign(entities, {
          [project.id]: project
        })
      },{});
      return Object.assign({}, state, {ids: projects.map(project => project.id), entities: entities});
    }
    case actions.ActionTypes.SELECT_PROJECT: {
      return Object.assign({}, state, {selectedId: action.payload.id});
    }
    case actions.ActionTypes.LOAD_PROJECTS_FAIL:
    case actions.ActionTypes.ADD_PROJECT_FAIL:
    case actions.ActionTypes.UPDATE_PROJECT_FAIL:
    case actions.ActionTypes.DELETE_PROJECT_FAIL:
    default:
      return state;
  }
}

export const getEntities = (state) => state.entities;
export const getSelectedId = (state) => state.selectedId; 
export const getIds = (state) => state.ids;
export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});
export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});