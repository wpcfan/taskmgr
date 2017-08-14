import {Auth} from '../domain';
import * as actions from '../actions/auth.action';

export const initialState: Auth = {};

export function reducer(state: Auth = initialState, action: actions.Actions): Auth {
  switch (action.type) {
    case actions.ActionTypes.LOGIN_SUCCESS:
    case actions.ActionTypes.REGISTER_SUCCESS: {
      const auth = <Auth>action.payload;
      return {
        token: auth.token,
        userId: auth.user.id
      };
    }
    case actions.ActionTypes.LOGIN_FAIL:
    case actions.ActionTypes.REGISTER_FAIL: {
      return {err: <string>action.payload};
    }
    default: {
      return state;
    }
  }
}
