import {Auth} from '../domain';
import * as actions from '../actions/auth.action';

export const initialState: Auth = {
  user: null,
  userId: null,
  err: 'not logged in',
  token: null,
};

export function reducer(state: Auth = initialState, action: actions.Actions): Auth {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
    case actions.REGISTER_SUCCESS: {
      const auth = <Auth>action.payload;
      return {
        user: null,
        err: null,
        token: auth.token,
        userId: auth.userId,
      };
    }
    case actions.LOAD_TOKEN: {
      const token = localStorage.getItem('access_token');
      const userId = localStorage.getItem('userId');
      return {
        user: null,
        err: null,
        token: token ? token : null,
        userId: userId ? userId : null,
      };
    }
    case actions.LOGIN_FAIL:
    case actions.REGISTER_FAIL: {
      return {
        user: null,
        err: <string>action.payload,
        userId: null,
        token: null,
      };
    }
    default: {
      return state;
    }
  }
}
