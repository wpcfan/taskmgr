import {Project} from '../domain';
import {createSelector} from '@ngrx/store';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity'
import {covertArrToObj, buildObjFromArr} from '../utils/reduer.util';
import * as actions from '../actions/project.action';

type combinedAction = actions.InviteMembersSuccessAction
  | actions.UpdateListsSuccessAction
  | actions.UpdateProjectSuccessAction;

export interface State extends EntityState<Project> {
  selectedId: string | null;
}

export function sortByName(a: Project, b: Project): number {
  return a.name.localeCompare(b.name);
}

export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>({
  selectId: (project: Project) => <string>project.id,
  sortComparer: sortByName,
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedId: null
});

const addProject = (state: State, action: actions.AddProjectSuccessAction) => {
  return adapter.addOne(action.payload, state);
};

const delProject = (state: State, action: actions.DeleteProjectSuccessAction) => {
  return adapter.removeOne(<string>action.payload.id, state);
};

const updateProject = (state: State, action: combinedAction) => {
  return adapter.updateOne({id: <string>action.payload.id, changes: action.payload}, state);
};

const loadProjects = (state: State, action: actions.LoadProjectsSuccessAction) => {
  return adapter.addAll(action.payload, state);
};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.ADD_SUCCESS:
      return addProject(state, <actions.AddProjectSuccessAction>action);
    case actions.DELETE_SUCCESS:
      return delProject(state, <actions.DeleteProjectSuccessAction>action);
    case actions.INVITE_SUCCESS:
    case actions.UPDATE_LISTS_SUCCESS:
    case actions.UPDATE_SUCCESS:
      return updateProject(state, <combinedAction>action);
    case actions.LOADS_SUCCESS:
      return loadProjects(state, <actions.LoadProjectsSuccessAction>action);
    case actions.SELECT:
      return { ...state, selectedId: <string>action.payload.id };
    default:
      return state;
  }
}

export const getEntities = (state: State): { [id: string]: Project } => state.entities;
export const getSelectedId = (state: State): string | null => state.selectedId;
export const getIds = (state: State): string[] => state.ids;
// export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
//   return entities[selectedId];
// });
export const getAll = createSelector<State, { [id: string]: Project }, string[], Project[]>(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
