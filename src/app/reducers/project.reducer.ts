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

const addProject = (state: State, action: actions.AddProjectSuccessAction) => {
  const project = action.payload;
  if (state.entities[<string>project.id]) {
    return state;
  }
  const ids = [...state.ids, <string>project.id];
  const entities = {...state.entities, [<string>project.id]: project};
  return {...state, ids: ids, entities: entities};
};

const delProject = (state: State, action: actions.DeleteProjectSuccessAction) => {
  const project = action.payload;
  const ids = state.ids.filter(id => id !== project.id);
  const newEntities = buildObjFromArr(ids, state.entities);
  return {
    ids: ids,
    entities: newEntities,
    selectedId: null
  };
};

const updateProject = (state: State, action: actions.InviteMembersSuccessAction | actions.UpdateListsSuccessAction | actions.UpdateProjectSuccessAction) => {
  const project = action.payload;
  const entities = {...state.entities, [<string>project.id]: project};
  return {...state, entities: entities};
};

const loadProjects = (state: State, action: actions.LoadProjectsSuccessAction) => {
  const projects = action.payload;
  // if projects is null then return the orginal state
  if (projects === null) {
    return state;
  }
  const newProjects = projects.filter(project => !state.entities[<string>project.id]);
  const newIds = newProjects.map(project => <string>project.id);
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
      return addProject(state, <actions.AddProjectSuccessAction>action);
    case actions.DELETE_SUCCESS:
      return delProject(state, <actions.DeleteProjectSuccessAction>action);
    case actions.INVITE_SUCCESS:
    case actions.UPDATE_LISTS_SUCCESS:
    case actions.UPDATE_SUCCESS:
      return updateProject(state, <actions.InviteMembersSuccessAction | actions.UpdateListsSuccessAction | actions.UpdateProjectSuccessAction>action);
    case actions.LOADS_SUCCESS:
      return loadProjects(state, <actions.LoadProjectsSuccessAction>action);
    case actions.SELECT:
      return {...state, selectedId: <string>action.payload.id};
    default:
      return state;
  }
}

export const getEntities = (state: State) => state.entities;
export const getSelectedId = (state: State) => state.selectedId;
export const getIds = (state: State) => state.ids;
export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId: string) => {
  return entities[selectedId];
});
export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
