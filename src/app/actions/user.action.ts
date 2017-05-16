import { Action } from '@ngrx/store';
import { User, Err } from '../domain';
import { type } from '../utils/type.util';

export interface UserProject {
  user: User;
  projectId: string;
}

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 * 
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique. 
 */
export const ActionTypes = {
  ADD_USER_PROJECT:              type('[User] Add User Project'),
  ADD_USER_PROJECT_SUCCESS:      type('[User] Add User Project Success'),
  ADD_USER_PROJECT_FAIL:         type('[User] Add User Project Fail'),  
  REMOVE_USER_PROJECT:           type('[User] Remove User Project'),
  REMOVE_USER_PROJECT_SUCCESS:   type('[User] Remove User Project Success'),
  REMOVE_USER_PROJECT_FAIL:      type('[User] Remove User Project Fail'),  
  LOAD_ALL_USERS:                type('[User] Load All Users'),  
  LOAD_ALL_USERS_SUCCESS:        type('[User] Load All Users Success'),  
  LOAD_ALL_USERS_FAIL:           type('[User] Load All Users Fail'),  
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class AddUserProjectAction implements Action {
  type = ActionTypes.ADD_USER_PROJECT;

  constructor(public payload: UserProject) { }
}

export class AddUserProjectSuccessAction implements Action {
  type = ActionTypes.ADD_USER_PROJECT_SUCCESS;

  constructor(public payload: User) { }
}

export class AddUserProjectFailAction implements Action {
  type = ActionTypes.ADD_USER_PROJECT_FAIL;

  constructor(public payload: Err) { }
}

export class RemoveUserProjectAction implements Action {
  type = ActionTypes.REMOVE_USER_PROJECT;

  constructor(public payload: {user: User, projectId: string}) { }
}

export class RemoveUserProjectSuccessAction implements Action {
  type = ActionTypes.REMOVE_USER_PROJECT_SUCCESS;

  constructor(public payload: User) { }
}

export class RemoveUserProjectFailAction implements Action {
  type = ActionTypes.REMOVE_USER_PROJECT_FAIL;

  constructor(public payload: Err) { }
}

export class LoadAllUsersAction implements Action {
  type = ActionTypes.LOAD_ALL_USERS;

  constructor(public payload: any) { }
}

export class LoadAllUsersSuccessAction implements Action {
  type = ActionTypes.LOAD_ALL_USERS_SUCCESS;

  constructor(public payload: User[]) { }
}

export class LoadAllUsersFailAction implements Action {
  type = ActionTypes.LOAD_ALL_USERS_FAIL;

  constructor(public payload: Err) { }
}



/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = AddUserProjectAction
  | AddUserProjectSuccessAction
  | AddUserProjectFailAction
  | LoadAllUsersAction
  | LoadAllUsersSuccessAction
  | LoadAllUsersFailAction
  | RemoveUserProjectAction
  | RemoveUserProjectSuccessAction
  | RemoveUserProjectFailAction
  ;