import { Reducer, Action } from '@ngrx/store';
import * as models from '../domain';
import * as actions from '../actions/auth.action';

export const initialState: models.Auth = {}

export function reducer (state: models.Auth = initialState, action: actions.Actions): models.Auth {
  switch (action.type) {
    case actions.ActionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, action.payload);
    case actions.ActionTypes.LOGIN_FAIL:
      return Object.assign({}, {
        err: action.payload
      });
    case actions.ActionTypes.LOGOUT:
      return initialState;
    case actions.ActionTypes.REGISTER_SUCCESS:
      return Object.assign({}, state, action.payload);
    case actions.ActionTypes.REGISTER_FAIL:
      return Object.assign({}, {
        err: action.payload
      });
    default:
      return state;
  }
}

export const getAuth = (state: models.Auth) => state;
export const getAuthToken = (state: models.Auth) => state.token;
export const getAuthUser = (state: models.Auth) => state.user;
export const getAuthErr= (state: models.Auth) => state.err;