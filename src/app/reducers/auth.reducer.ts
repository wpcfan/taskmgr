import {Auth} from '../domain';
import * as actions from '../actions/auth.action';

export const initialState: Auth = {};

export function reducer(state: Auth = initialState, action: actions.Actions): Auth {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
    case actions.REGISTER_SUCCESS: {
      const auth = <Auth>action.payload;
      return {
        token: auth.token,
        userId: auth.user!.id
      };
    }
    case actions.LOAD_TOKEN: {
      const token = localStorage.getItem('access_token');
      return {
        token: <string>token,
      }
    }
    case actions.LOGIN_FAIL:
    case actions.REGISTER_FAIL: {
      return {err: <string>action.payload};
    }
    default: {
      return state;
    }
  }
}
