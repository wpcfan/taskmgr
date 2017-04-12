import { Reducer, Action } from '@ngrx/store';
import * as entities from '../domain';
import * as actions from '../actions/auth.action';

export interface State{
  auth: entities.Auth;
}

const initialState: State = {
  auth: {}
}

export function reducer (state: State = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.ActionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {auth: action.payload});
    case actions.ActionTypes.LOGIN_FAIL:
      return Object.assign({}, state, {
        auth: {err: action.payload}
      });
    case actions.ActionTypes.LOGOUT:
      return initialState;
    case actions.ActionTypes.REGISTER_SUCCESS:
      return Object.assign({}, state, {auth: action.payload});
    case actions.ActionTypes.REGISTER_FAIL:
      return Object.assign({}, state, {
        auth: {err: action.payload}
      });
    default:
      return state;
  }
}

export const getAuth = (state: State) => state.auth;