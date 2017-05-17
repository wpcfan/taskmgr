import * as actions from '../actions/user.action';
import { User } from '../domain';
import { createSelector } from 'reselect';

export interface State {
  ids: string [];
  entities: {[id: string]: User};
};

const initialState: State = {
  ids: [],
  entities: {}
};

export function reducer(state = initialState, action: actions.Actions ): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_USER_PROJECT_SUCCESS: {
      const user = <User>action.payload;
      const ids = [...state.ids, user.id];
      const entities = Object.assign({}, state.entities, {[user.id]: user});
      return Object.assign({}, state, {ids: ids, entities: entities});
    }
    case actions.ActionTypes.REMOVE_USER_PROJECT_SUCCESS: {
      const user = <User>action.payload;
      const ids = state.ids.filter(id => id !== user.id);
      const entities = ids.reduce((entities: { [id: string]: User }, id) => {
        return Object.assign(entities, {
          [id]: state.entities[id]
        })
      },{});
      return Object.assign({}, state, {ids: ids, entities: entities});
    }
    case actions.ActionTypes.LOAD_ALL_USERS_SUCCESS:{
      const users = <User[]>action.payload;
      // if task is null then return the orginal state
      if(users === null) return state; 
      const entities = users.reduce((entities: { [id: string]: User }, user) => {
        return Object.assign(entities, {
          [user.id]: user
        })
      },{});
      return Object.assign({}, state, 
        {ids: users.map(user => user.id), entities: entities});
    }
    case actions.ActionTypes.LOAD_USERS_BY_PRJ_SUCCESS:{
      const users = <User[]>action.payload;
      if(users === null) return state; 
      const newUsers = users.filter(user => !state.entities[user.id]);
      const entities = newUsers.reduce((entities: { [id: string]: User }, user) => {
        return Object.assign(entities, {
          [user.id]: user
        })
      },{});
      return Object.assign({}, state, 
        { ids: newUsers.map(user => user.id), entities: entities});
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