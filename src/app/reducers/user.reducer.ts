import {createSelector} from '@ngrx/store';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import * as actions from '../actions/user.action';
import * as authActions from '../actions/auth.action';
import * as prjActions from '../actions/project.action';
import {User, Auth} from '../domain';
import { Project } from '../domain/project';

export interface State extends EntityState<User> {}

export function sortByOrder(a: User, b: User): number {
  return a.username.localeCompare(b.username);
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => <string>user.username,
  sortComparer: sortByOrder,
});

export const initialState: State = adapter.getInitialState();

const register = (state: State, action: authActions.LoginSuccessAction | authActions.RegisterSuccessAction) => {
  const auth = <Auth>action.payload;
  return state.ids.indexOf(<string>auth.userId) === -1 ?
    {...adapter.addOne(<User>auth.user, state)} : state;
};

export function reducer(state: State = initialState, action: actions.Actions | authActions.Actions | prjActions.Actions): State {
  switch (action.type) {
    case authActions.LOGIN_SUCCESS:
    case authActions.REGISTER_SUCCESS:
      return register(state, <authActions.LoginSuccessAction | authActions.RegisterSuccessAction>action);
    case actions.SEARCH_USERS_SUCCESS: {
      return {...adapter.addMany(<User[]>action.payload, state)};
    }
    case prjActions.LOADS_SUCCESS: {
      const projects = action.payload;
      const members = projects.map((p: Project) => p.members ? p.members : []);
      const arrMembers = members.reduce((a: User[], b: User[]) => a.concat(b), []);
      return {...adapter.addMany(<User[]>arrMembers, state)};
    }
    default: {
      return state;
    }
  }
}
