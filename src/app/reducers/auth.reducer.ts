import * as models from '../domain';
import * as actions from '../actions/auth.action';

export const initialState: models.Auth = {};

export function reducer(state: models.Auth = initialState, action: actions.Actions): models.Auth {
  switch (action.type) {
    case actions.ActionTypes.LOGIN_SUCCESS:
      return {...action.payload};
    case actions.ActionTypes.LOGIN_FAIL:
    case actions.ActionTypes.REGISTER_FAIL:
      return {err: action.payload};
    case actions.ActionTypes.REGISTER_SUCCESS:
      return {...action.payload};
    default:
      return state;
  }
}

export const getAuth = (state: models.Auth) => state;
export const getAuthUser = (state: models.Auth) => state.user;
