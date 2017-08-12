import {Action} from '@ngrx/store';
import {User, Project} from '../domain';
import {type} from '../utils/type.util';

export interface UserProject {
  user: User;
  projectId: string;
}

export const ActionTypes = {
  ADD_USER_PROJECT: type('[User] Add User Project'),
  ADD_USER_PROJECT_SUCCESS: type('[User] Add User Project Success'),
  ADD_USER_PROJECT_FAIL: type('[User] Add User Project Fail'),
  REMOVE_USER_PROJECT: type('[User] Remove User Project'),
  REMOVE_USER_PROJECT_SUCCESS: type('[User] Remove User Project Success'),
  REMOVE_USER_PROJECT_FAIL: type('[User] Remove User Project Fail'),
  BATCH_UPDATE_USER_PROJECT: type('[User] Batch Update User Project'),
  BATCH_UPDATE_USER_PROJECT_SUCCESS: type('[User] Batch Update User Project Success'),
  BATCH_UPDATE_USER_PROJECT_FAIL: type('[User] Batch Update User Project Fail'),
  SEARCH_USERS: type('[User] Search Users'),
  SEARCH_USERS_SUCCESS: type('[User] Search Users Success'),
  SEARCH_USERS_FAIL: type('[User] Search Users Fail'),
  LOAD_USERS_BY_PRJ: type('[User] Load Users By Projects'),
  LOAD_USERS_BY_PRJ_SUCCESS: type('[User] Load Users By Projects Success'),
  LOAD_USERS_BY_PRJ_FAIL: type('[User] Load Users By Projects Fail'),
};

export class AddUserProjectAction implements Action {
  type = ActionTypes.ADD_USER_PROJECT;

  constructor(public payload: UserProject) {
  }
}

export class AddUserProjectSuccessAction implements Action {
  type = ActionTypes.ADD_USER_PROJECT_SUCCESS;

  constructor(public payload: User) {
  }
}

export class AddUserProjectFailAction implements Action {
  type = ActionTypes.ADD_USER_PROJECT_FAIL;

  constructor(public payload: string) {
  }
}

export class RemoveUserProjectAction implements Action {
  type = ActionTypes.REMOVE_USER_PROJECT;

  constructor(public payload: UserProject) {
  }
}

export class RemoveUserProjectSuccessAction implements Action {
  type = ActionTypes.REMOVE_USER_PROJECT_SUCCESS;

  constructor(public payload: User) {
  }
}

export class RemoveUserProjectFailAction implements Action {
  type = ActionTypes.REMOVE_USER_PROJECT_FAIL;

  constructor(public payload: string) {
  }
}

export class BatchUpdateUserProjectAction implements Action {
  type = ActionTypes.BATCH_UPDATE_USER_PROJECT;

  constructor(public payload: Project) {
  }
}

export class BatchUpdateUserProjectSuccessAction implements Action {
  type = ActionTypes.BATCH_UPDATE_USER_PROJECT_SUCCESS;

  constructor(public payload: User[]) {
  }
}

export class BatchUpdateUserProjectFailAction implements Action {
  type = ActionTypes.BATCH_UPDATE_USER_PROJECT_FAIL;

  constructor(public payload: string) {
  }
}

export class SearchUsersAction implements Action {
  type = ActionTypes.SEARCH_USERS;

  constructor(public payload: string) {
  }
}

export class SearchUsersSuccessAction implements Action {
  type = ActionTypes.SEARCH_USERS_SUCCESS;

  constructor(public payload: User[]) {
  }
}

export class SearchUsersFailAction implements Action {
  type = ActionTypes.SEARCH_USERS_FAIL;

  constructor(public payload: string) {
  }
}

export class LoadUsersByPrjAction implements Action {
  type = ActionTypes.LOAD_USERS_BY_PRJ;

  constructor(public payload: string) {
  }
}

export class LoadUsersByPrjSuccessAction implements Action {
  type = ActionTypes.LOAD_USERS_BY_PRJ_SUCCESS;

  constructor(public payload: User[]) {
  }
}

export class LoadUsersByPrjFailAction implements Action {
  type = ActionTypes.LOAD_USERS_BY_PRJ_FAIL;

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
