import {Project} from '../domain';
import {createSelector} from '@ngrx/store';
import {covertArrToObj, buildObjFromArr} from '../utils/reduer.util';
import * as actions from '../actions/project.action';

export interface State {
  ids: string[];
  entities: { [id: string]: Project };
  selectedId: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedId: null,
};

const addProject = (state, action) => {
  const project = action.payload;
  if (state.entities[project.id]) {
    return state;
  }
  const ids = [...state.ids, project.id];
  const entities = {...state.entities, [project.id]: project};
  return {...state, ids: ids, entities: entities};
};

const delProject = (state, action) => {
  const project = action.payload;
  const ids = state.ids.filter(id => id !== project.id);
  const newEntities = buildObjFromArr(ids, state.entities);
  return {
    ids: ids,
    entities: newEntities,
    selectedId: null
  };
};

const updateProject = (state, action) => {
  const project = action.payload;
  const entities = {...state.entities, [project.id]: project};
  return {...state, entities: entities};
};

const loadProjects = (state, action) => {
  const projects = action.payload;
  // if projects is null then return the orginal state
  if (projects === null) {
    return state;
  }
  const newProjects = projects.filter(project => !state.entities[project.id]);
  const newIds = newProjects.map(project => project.id);
  if (newProjects.length === 0) {
    return state;
  }
  const newEntities = covertArrToObj(newProjects);
  return {
    ids: [...state.ids, ...newIds],
    entities: {...state.entities, ...newEntities},
    selectedId: null
  };
};

export function reducer (state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.ADD_SUCCESS:
      return addProject(state, action);
    case actions.DELETE_SUCCESS:
      return delProject(state, action);
    case actions.INVITE_SUCCESS:
    case actions.UPDATE_LISTS_SUCCESS:
    case actions.UPDATE_SUCCESS:
      return updateProject(state, action);
    case actions.LOADS_SUCCESS:
      return loadProjects(state, action);
    case actions.SELECT:
      return {...state, selectedId: action.payload.id};
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
