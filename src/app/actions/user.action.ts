import {Action} from '@ngrx/store';
import {User, Project} from '../domain';

export interface UserProject {
  user: User;
  projectId: string;
}

export const ADD_USER_PROJECT = '[User] Add User Project';
export const ADD_USER_PROJECT_SUCCESS = '[User] Add User Project Success';
export const ADD_USER_PROJECT_FAIL = '[User] Add User Project Fail';
export const REMOVE_USER_PROJECT = '[User] Remove User Project';
export const REMOVE_USER_PROJECT_SUCCESS = '[User] Remove User Project Success';
export const REMOVE_USER_PROJECT_FAIL = '[User] Remove User Project Fail';
export const BATCH_UPDATE_USER_PROJECT = '[User] Batch Update User Project';
export const BATCH_UPDATE_USER_PROJECT_SUCCESS = '[User] Batch Update User Project Success';
export const BATCH_UPDATE_USER_PROJECT_FAIL = '[User] Batch Update User Project Fail';
export const SEARCH_USERS = '[User] Search Users';
export const SEARCH_USERS_SUCCESS = '[User] Search Users Success';
export const SEARCH_USERS_FAIL = '[User] Search Users Fail';
export const LOAD_USERS_BY_PRJ = '[User] Load Users By Projects';
export const LOAD_USERS_BY_PRJ_SUCCESS = '[User] Load Users By Projects Success';
export const LOAD_USERS_BY_PRJ_FAIL = '[User] Load Users By Projects Fail';

export class AddUserProjectAction implements Action {
  readonly type = ADD_USER_PROJECT;

  constructor(public payload: UserProject) {
  }
}

export class AddUserProjectSuccessAction implements Action {
  readonly type = ADD_USER_PROJECT_SUCCESS;

  constructor(public payload: User) {
  }
}

export class AddUserProjectFailAction implements Action {
  readonly type = ADD_USER_PROJECT_FAIL;

  constructor(public payload: string) {
  }
}

export class RemoveUserProjectAction implements Action {
  readonly type = REMOVE_USER_PROJECT;

  constructor(public payload: UserProject) {
  }
}

export class RemoveUserProjectSuccessAction implements Action {
  readonly type = REMOVE_USER_PROJECT_SUCCESS;

  constructor(public payload: User) {
  }
}

export class RemoveUserProjectFailAction implements Action {
  readonly type = REMOVE_USER_PROJECT_FAIL;

  constructor(public payload: string) {
  }
}

export class BatchUpdateUserProjectAction implements Action {
  readonly type = BATCH_UPDATE_USER_PROJECT;

  constructor(public payload: Project) {
  }
}

export class BatchUpdateUserProjectSuccessAction implements Action {
  readonly type = BATCH_UPDATE_USER_PROJECT_SUCCESS;

  constructor(public payload: User[]) {
  }
}

export class BatchUpdateUserProjectFailAction implements Action {
  readonly type = BATCH_UPDATE_USER_PROJECT_FAIL;

  constructor(public payload: string) {
  }
}

export class SearchUsersAction implements Action {
  readonly type = SEARCH_USERS;

  constructor(public payload: string) {
  }
}

export class SearchUsersSuccessAction implements Action {
  readonly type = SEARCH_USERS_SUCCESS;

  constructor(public payload: User[]) {
  }
}

export class SearchUsersFailAction implements Action {
  readonly type = SEARCH_USERS_FAIL;

  constructor(public payload: string) {
  }
}

export class LoadUsersByPrjAction implements Action {
  readonly type = LOAD_USERS_BY_PRJ;

  constructor(public payload: string) {
  }
}

export class LoadUsersByPrjSuccessAction implements Action {
  readonly type = LOAD_USERS_BY_PRJ_SUCCESS;

  constructor(public payload: User[]) {
  }
}

export class LoadUsersByPrjFailAction implements Action {
  readonly type = LOAD_USERS_BY_PRJ_FAIL;

  constructor(public payload: string) {
  }
}

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
  | BatchUpdateUserProjectAction
  | BatchUpdateUserProjectSuccessAction
  | BatchUpdateUserProjectFailAction
  | LoadUsersByPrjAction
  | LoadUsersByPrjSuccessAction
  | LoadUsersByPrjFailAction
  ;
