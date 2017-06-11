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

export function reducer(state = initialState, action: actions.Actions | authActions.Actions): State {
  switch (action.type) {
    case authActions.ActionTypes.LOGIN_SUCCESS:
    case authActions.ActionTypes.REGISTER_SUCCESS: {
      const auth = <Auth>action.payload;
      if (state.ids.indexOf(auth.userId) > -1) {
        return {...state, entities: {...state.entities, [auth.user.id]: auth.user}};
      } else {
        return {
          ids: [...state.ids, auth.user.id],
          entities: {...state.entities, [auth.user.id]: auth.user}
        };
      }
    }
    case actions.ActionTypes.ADD_USER_PROJECT_SUCCESS: {
      const user = <User>action.payload;
      const ids = [...state.ids, user.id];
      const entities = {...state.entities, [user.id]: user};
      if (state.entities[user.id]) {
        return {...state, entities: entities};
      } else {
        return {...state, ids: ids, entities: entities};
      }
    }
    case actions.ActionTypes.REMOVE_USER_PROJECT_SUCCESS: {
      const user = <User>action.payload;
      if (!state.entities[user.id]) {
        return state;
      }
      return {...state, entities: {...state.entities, [user.id]: user}};
    }
    case actions.ActionTypes.SEARCH_USERS_SUCCESS: {
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
    }
    case actions.ActionTypes.LOAD_USERS_BY_PRJ_SUCCESS: {
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
    }
    case actions.ActionTypes.BATCH_UPDATE_USER_PROJECT_SUCCESS: {
      const users = <User[]>action.payload;
      const userProjects = covertArrToObj(users);
      const newEnities = {...state.entities, ...userProjects};
      return {...state, entities: newEnities};
    }
    case actions.ActionTypes.LOAD_USERS_BY_PRJ_FAIL:
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
