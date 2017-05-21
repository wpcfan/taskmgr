import { Action } from '@ngrx/store';
import { User, Err } from '../domain';
import { type } from '../utils/type.util';

export interface UserProject {
  user: User;
  projectId: string;
}

export interface UserTask {
  user: User;
  taskId: string;
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
  SEARCH_USERS:                  type('[User] Search Users'),  
  SEARCH_USERS_SUCCESS:          type('[User] Search Users Success'),  
  SEARCH_USERS_FAIL:             type('[User] Search Users Fail'),  
  LOAD_USERS_BY_PRJ:             type('[User] Load Users By Projects'),  
  LOAD_USERS_BY_PRJ_SUCCESS:     type('[User] Load Users By Projects Success'),  
  LOAD_USERS_BY_PRJ_FAIL:        type('[User] Load Users By Projects Fail'), 
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

  constructor(public payload: UserProject) { }
}

export class RemoveUserProjectSuccessAction implements Action {
  type = ActionTypes.REMOVE_USER_PROJECT_SUCCESS;

  constructor(public payload: User) { }
}

export class RemoveUserProjectFailAction implements Action {
  type = ActionTypes.REMOVE_USER_PROJECT_FAIL;

  constructor(public payload: Err) { }
}

export class SearchUsersAction implements Action {
  type = ActionTypes.SEARCH_USERS;

  constructor(public payload: string) { }
}

export class SearchUsersSuccessAction implements Action {
  type = ActionTypes.SEARCH_USERS_SUCCESS;

  constructor(public payload: User[]) { }
}

export class SearchUsersFailAction implements Action {
  type = ActionTypes.SEARCH_USERS_FAIL;

  constructor(public payload: Err) { }
}

export class LoadUsersByPrjAction implements Action {
  type = ActionTypes.LOAD_USERS_BY_PRJ;

  constructor(public payload: string) { }
}

export class LoadUsersByPrjSuccessAction implements Action {
  type = ActionTypes.LOAD_USERS_BY_PRJ_SUCCESS;

  constructor(public payload: User[]) { }
}

export class LoadUsersByPrjFailAction implements Action {
  type = ActionTypes.LOAD_USERS_BY_PRJ_FAIL;

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
  | SearchUsersAction
  | SearchUsersSuccessAction
  | SearchUsersFailAction
  | RemoveUserProjectAction
  | RemoveUserProjectSuccessAction
  | RemoveUserProjectFailAction
  | LoadUsersByPrjAction
  | LoadUsersByPrjSuccessAction
  | LoadUsersByPrjFailAction
  ;