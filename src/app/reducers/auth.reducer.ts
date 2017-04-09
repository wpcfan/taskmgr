import { Reducer, Action } from '@ngrx/store';
import * as entities from '../domain';
import * as authAction from '../actions/auth.action';

export interface State{
  auth: entities.Auth;
}

const initialState: State = {
  auth: {}
}

export function reducer (state: State = initialState, action: authAction.Actions): State {
  switch (action.type) {
    case authAction.ActionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {auth: action.payload});
    case authAction.ActionTypes.LOGIN_FAIL:
      return Object.assign({}, state, {
        auth: {err: action.payload}
      });
    case authAction.ActionTypes.LOGOUT:
      return initialState;
    case authAction.ActionTypes.REGISTER_SUCCESS:
      return Object.assign({}, state, {auth: action.payload});
    case authAction.ActionTypes.REGISTER_FAIL:
      return Object.assign({}, state, {
        auth: {err: action.payload}
      });
    default:
      return state;
  }
}

export const getAuth = (state: State) => state.auth;