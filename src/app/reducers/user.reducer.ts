import * as actions from '../actions/user.action';
import * as authActions from '../actions/auth.action';
import {covertArrToObj} from '../utils/reduer.util';
import {User, Auth} from '../domain';
import {createSelector} from 'reselect';

export interface State {
  ids: string [];
  entities: { [id: string]: User };
}

export const initialState: State = {
  ids: [],
  entities: {}
};

const register = (state, action) => {
  const auth = <Auth>action.payload;
  if (state.ids.indexOf(auth.userId) > -1) {
    return {...state, entities: {...state.entities, [auth.user.id]: auth.user}};
  } else {
    return {
      ids: [...state.ids, auth.user.id],
      entities: {...state.entities, [auth.user.id]: auth.user}
    };
  }
};

const addPrjRef = (state, action) => {
  const user = <User>action.payload;
  const ids = [...state.ids, user.id];
  const entities = {...state.entities, [user.id]: user};
  if (state.entities[user.id]) {
    return {...state, entities: entities};
  } else {
    return {...state, ids: ids, entities: entities};
  }
};

const removePrjRef = (state, action) => {
  const user = <User>action.payload;
  if (!state.entities[user.id]) {
    return state;
  }
  return {...state, entities: {...state.entities, [user.id]: user}};
};

const searchUsers = (state, action) => {
  const users = <User[]>action.payload;
  if (users === null) {
    return state;
  }
  const newUsers = users.filter(user => !state.entities[user.id]);
  const newIds = newUsers.map(user => user.id);
  if (newIds.length === 0) {
    return state;
  }
  const newEntities = covertArrToObj(newUsers);
  return {
    ids: [...state.ids, ...newIds],
    entities: {...state.entities, ...newEntities}
  };
};

const loadByPrj = (state, action) => {
  const users = <User[]>action.payload;
  if (users === null) {
    return state;
  }
  const newUsers = users.filter(user => !state.entities[user.id]);
  const newIds = newUsers.map(user => user.id);
  if (newIds.length === 0) {
    return state;
  }
  const newEntities = covertArrToObj(newUsers);
  return {
    ids: [...state.ids, ...newIds],
    entities: {...state.entities, ...newEntities}
  };
};

const batchUpdatePrjRef = (state, action) => {
  const users = <User[]>action.payload;
  const userProjects = covertArrToObj(users);
  const newEnities = {...state.entities, ...userProjects};
  return {...state, entities: newEnities};
};

export function reducer (state = initialState, action: actions.Actions | authActions.Actions): State {
  switch (action.type) {
    case authActions.ActionTypes.LOGIN_SUCCESS:
    case authActions.ActionTypes.REGISTER_SUCCESS:
      return register(state, action);
    case actions.ActionTypes.ADD_USER_PROJECT_SUCCESS:
      return addPrjRef(state, action);
    case actions.ActionTypes.REMOVE_USER_PROJECT_SUCCESS:
      return removePrjRef(state, action);
    case actions.ActionTypes.SEARCH_USERS_SUCCESS:
      return searchUsers(state, action);
    case actions.ActionTypes.LOAD_USERS_BY_PRJ_SUCCESS:
      return loadByPrj(state, action);
    case actions.ActionTypes.BATCH_UPDATE_USER_PROJECT_SUCCESS:
      return batchUpdatePrjRef(state, action);
    default: {
      return state;
    }
  }
}

export const getEntities = (state) => state.entities;
export const getIds = (state) => state.ids;
export const getUsers = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
