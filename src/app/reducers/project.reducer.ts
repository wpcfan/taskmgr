import { Project } from '../domain';
import { createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as actions from '../actions/project.action';

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

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.ADD_SUCCESS:
      return { ...adapter.addOne(action.payload, state), selectedId: null };
    case actions.DELETE_SUCCESS:
      return { ...adapter.removeOne(<string>action.payload.id, state), selectedId: null };
    case actions.INVITE_SUCCESS:
    case actions.UPDATE_LISTS_SUCCESS:
    case actions.UPDATE_SUCCESS:
    case actions.INSERT_FILTER_SUCCESS:
      return { ...adapter.updateOne({ id: <string>action.payload.id, changes: action.payload }, state) };
    case actions.LOADS_SUCCESS:
      return { ...adapter.addMany(action.payload, state), selectedId: null };
    case actions.SELECT:
      return { ...state, selectedId: <string>action.payload.id };
    default:
      return state;
  }
}

export const getSelectedId = (state: State) => state.selectedId;
