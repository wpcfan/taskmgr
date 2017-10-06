import {createSelector} from '@ngrx/store';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import * as actions from '../actions/user.action';
import * as authActions from '../actions/auth.action';
import {User, Auth} from '../domain';

export interface State extends EntityState<User> {}

export function sortByOrder(a: User, b: User): number {
  return a.email.localeCompare(b.email);
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => <string>user.id,
  sortComparer: sortByOrder,
});

export const initialState: State = adapter.getInitialState();

const register = (state: State, action: authActions.LoginSuccessAction | authActions.RegisterSuccessAction) => {
  const auth = <Auth>action.payload;
  return state.ids.indexOf(<string>auth.userId) === -1 ?
    {...adapter.addOne(<User>auth.user, state)} : state;
};

export function reducer(state: State = initialState, action: actions.Actions | authActions.Actions): State {
  switch (action.type) {
    case authActions.LOGIN_SUCCESS:
    case authActions.REGISTER_SUCCESS:
      return register(state, <authActions.LoginSuccessAction | authActions.RegisterSuccessAction>action);
    case actions.ADD_USER_PROJECT_SUCCESS:
      return {...adapter.addOne(<User>action.payload, state)};
    case actions.REMOVE_USER_PROJECT_SUCCESS:
      return {...adapter.removeOne(<string>action.payload.id, state)};
    case actions.SEARCH_USERS_SUCCESS:
    case actions.LOAD_USERS_BY_PRJ_SUCCESS:
    case actions.BATCH_UPDATE_USER_PROJECT_SUCCESS:
      return {...adapter.addMany(<User[]>action.payload, state)};
    default: {
      return state;
    }
  }
}
