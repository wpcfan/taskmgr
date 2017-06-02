import * as actions from '../actions/user.action';
import {User} from '../domain';
import {createSelector} from 'reselect';

export interface State {
  ids: string [];
  entities: { [id: string]: User };
}

export const initialState: State = {
  ids: [],
  entities: {}
};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_USER_PROJECT_SUCCESS: {
      const user = <User>action.payload;
      if (state.entities[user.id]) {
        return state;
      }
      const ids = [...state.ids, user.id];
      const entities = {...state.entities, [user.id]: user};
      return {...state, ids: ids, entities: entities};
    }
    case actions.ActionTypes.REMOVE_USER_PROJECT_SUCCESS: {
      const user = <User>action.payload;
      const newIds = state.ids.filter(id => id !== user.id);
      const newEntities = newIds.reduce((entities, id) => ({...entities, [id]: state.entities[id]}), {});
      return {...state, ids: newIds, entities: newEntities};
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
      const newEntities = newUsers.reduce((entities, user) => ({...entities, [user.id]: user}), {});
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
      if (newIds.length === 0) {return state; }
      const newEntities = newUsers.reduce((entities, user) => ({...entities, [user.id]: user}), {});
      return {
        ids: [...state.ids, ...newIds],
        entities: {...state.entities, ...newEntities}
      };
    }
    case actions.ActionTypes.BATCH_UPDATE_USER_PROJECT_SUCCESS: {
      const users = <User[]>action.payload;
      const userProjects = users.reduce((entities, user) => ({...entities, [user.id]: user}), {});
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
