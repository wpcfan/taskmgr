import * as entities from '../domain';
import { createSelector } from 'reselect';
import * as actions from '../actions/project.action';

export interface State{
  projects: entities.Project[];
  selectedId: string | null;
}

const initialState: State = {
  projects: [],
  selectedId: null
};

export function reducer(
  state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_PROJECT_SUCCESS: {
      return Object.assign({}, state, 
        {projects: [...state.projects, action.payload]});
    }
    case actions.ActionTypes.DELETE_PROJECT_SUCCESS: {
      return Object.assign({}, state, 
        {projects: state.projects.filter(prj => prj.id !== action.payload.id)});
    }
    case actions.ActionTypes.UPDATE_PROJECT_SUCCESS: {
      const prj_update = state.projects.map(prj => {
        if(prj.id === action.payload.id) {
          return Object.assign({}, action.payload);
        } else {
          return prj;
        }
      });
      return Object.assign({}, state, {projects: prj_update});
    }
    case actions.ActionTypes.LOAD_PROJECTS_SUCCESS:{
      return Object.assign({}, state, {projects: [...action.payload]});
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

export const getProjects = (state) => state.projects;
export const getSelectedId = (state) => state.selectedId; 