import { Action } from '@ngrx/store';
import { type } from '../utils/type.util';
import * as entities from '../domain';

export const ActionTypes = {
  LOGIN:             type('[Auth] Login'),
  LOGIN_SUCCESS:     type('[Auth] Login Success'),
  LOGIN_FAIL:        type('[Err] Login Fail'),
  REGISTER:          type('[Auth] Register'),
  REGISTER_SUCCESS:  type('[Auth] Register Success'),
  REGISTER_FAIL:     type('[Err] Register Fail'),
  LOGOUT:            type('[Auth] Logout')
};

export class LoginAction implements Action {
  type = ActionTypes.LOGIN;
  constructor(public payload: {username: string, password: string}){}
}

export class LoginSuccessAction implements Action {
  type = ActionTypes.LOGIN_SUCCESS;
  constructor(public payload: entities.Auth){}
}

export class LoginFailAction implements Action {
  type = ActionTypes.LOGIN_FAIL;
  constructor(public payload: entities.Err){}
}

export class RegisterAction implements Action {
  type = ActionTypes.REGISTER;
  constructor(public payload: entities.User){}
}

export class RegisterSuccessAction implements Action {
  type = ActionTypes.REGISTER_SUCCESS;
  constructor(public payload: entities.Auth){}
}

export class RegisterFailAction implements Action {
  type = ActionTypes.REGISTER_FAIL;
  constructor(public payload: entities.Err){}
}

export class LogoutAction implements Action {
  type = ActionTypes.LOGOUT;
  constructor(public payload: entities.Auth){}
}

export type Actions
  = LoginAction
  | LoginSuccessAction
  | LoginFailAction
  | RegisterAction
  | RegisterSuccessAction
  | RegisterFailAction
  | LogoutAction;