import * as actions from '../actions/user.action';
import * as authActions from '../actions/auth.action';
import {covertArrToObj} from '../utils/reduer.util';
import {User, Auth} from '../domain';
import {createSelector} from '@ngrx/store';

export interface State {
  ids: string [];
  entities: { [id: string]: User };
}

export const initialState: State = {
  ids: [],
  entities: {}
};

const register = (state: State, action: authActions.LoginSuccessAction | authActions.RegisterSuccessAction) => {
  const auth = <Auth>action.payload;
  return state.ids.indexOf(<string>auth.userId) === -1 ?
    {
      ids: [...state.ids, <string>auth!.user!.id],
      entities: {...state.entities, [<string>auth!.user!.id]: <User>auth!.user}
    } : state;
};

const addPrjRef = (state: State, action: actions.AddUserProjectSuccessAction) => {
  const user = <User>action.payload;
  const ids: string[] = [...state.ids, <string>user.id];
  const entities = {...state.entities, [<string>user.id]: user};
  return state.entities[<string>user.id] ?
    {...state, entities: entities} : {...state, ids: ids, entities: entities};
};

const removePrjRef = (state: State, action: actions.RemoveUserProjectSuccessAction) => {
  const user = <User>action.payload;
  return state.entities[<string>user.id] ?
    {...state, entities: {...state.entities, [<string>user.id]: user}} : state;
};

const searchUsers = (state: State, action: actions.SearchUsersSuccessAction) => {
  const users = <User[]>action.payload;
  const newUsers = users.filter(user => !state.entities[<string>user.id]);
  const newIds = newUsers.map(user => <string>user.id);
  const newEntities = covertArrToObj(newUsers);
  return {
    ids: [...state.ids, ...newIds],
    entities: {...state.entities, ...newEntities}
  };
};

const loadByPrj = (state: State, action: actions.LoadUsersByPrjSuccessAction) => {
  const users = <User[]>action.payload;
  const newUsers = users.filter(user => !state.entities[<string>user.id]);
  const newIds: string[] = newUsers.map(user => <string>user.id);
  const newEntities = covertArrToObj(newUsers);
  return {
    ids: [...state.ids, ...newIds],
    entities: {...state.entities, ...newEntities}
  };
};

const batchUpdatePrjRef = (state: State, action: actions.BatchUpdateUserProjectSuccessAction) => {
  const users = <User[]>action.payload;
  const userProjects = covertArrToObj(users);
  const newEnities = {...state.entities, ...userProjects};
  return {...state, entities: newEnities};
};

export function reducer (state: State = initialState, action: actions.Actions | authActions.Actions): State {
  switch (action.type) {
    case authActions.LOGIN_SUCCESS:
    case authActions.REGISTER_SUCCESS:
      return register(state, <authActions.LoginSuccessAction | authActions.RegisterSuccessAction>action);
    case actions.ADD_USER_PROJECT_SUCCESS:
      return addPrjRef(state, <actions.AddUserProjectSuccessAction>action);
    case actions.REMOVE_USER_PROJECT_SUCCESS:
      return removePrjRef(state, <actions.RemoveUserProjectSuccessAction>action);
    case actions.SEARCH_USERS_SUCCESS:
      return searchUsers(state, <actions.SearchUsersSuccessAction>action);
    case actions.LOAD_USERS_BY_PRJ_SUCCESS:
      return loadByPrj(state, <actions.LoadUsersByPrjSuccessAction>action);
    case actions.BATCH_UPDATE_USER_PROJECT_SUCCESS:
      return batchUpdatePrjRef(state, <actions.BatchUpdateUserProjectSuccessAction>action);
    default: {
      return state;
    }
  }
}

export const getEntities = (state: State) => state.entities;
export const getIds = (state: State) => state.ids;
export const getUsers = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
