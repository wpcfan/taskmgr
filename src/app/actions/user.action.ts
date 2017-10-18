import {Action} from '@ngrx/store';
import {User, Project} from '../domain';

export interface UserProject {
  user: User;
  projectId: string;
}

export const SEARCH_USERS = '[User] Search Users';
export const SEARCH_USERS_SUCCESS = '[User] Search Users Success';
export const SEARCH_USERS_FAIL = '[User] Search Users Fail';
export const LOAD_USERS_BY_PRJ = '[User] Load Users By Projects';
export const LOAD_USERS_BY_PRJ_SUCCESS = '[User] Load Users By Projects Success';
export const LOAD_USERS_BY_PRJ_FAIL = '[User] Load Users By Projects Fail';

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

export type Actions
  = SearchUsersAction
  | SearchUsersSuccessAction
  | SearchUsersFailAction
  ;
