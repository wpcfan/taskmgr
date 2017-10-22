import { Action } from '@ngrx/store';
import { Project, User } from '../domain';

export const ADD = '[Project] Add';
export const ADD_SUCCESS = '[Project] Add Success';
export const ADD_FAIL = '[Project] Add Fail';
export const UPDATE = '[Project] Update';
export const UPDATE_SUCCESS = '[Project] Update Success';
export const UPDATE_FAIL = '[Project] Update Fail';
export const UPDATE_LISTS = '[Project] Update Lists';
export const UPDATE_LISTS_SUCCESS = '[Project] Update Lists Success';
export const UPDATE_LISTS_FAIL = '[Project] Update Lists Fail';
export const DELETE = '[Project] Delete';
export const DELETE_SUCCESS = '[Project] Delete Success';
export const DELETE_FAIL = '[Project] Delete Fail';
export const LOADS = '[Project] Load';
export const LOADS_SUCCESS = '[Project] Load Success';
export const LOADS_FAIL = '[Project] Load Fail';
export const SELECT = '[Project] Select Project';
export const INVITE = '[Project] Invite Members';
export const INVITE_SUCCESS = '[Project] Invite Members Success';
export const INVITE_FAIL = '[Project] Invite Members Fail';
export const INSERT_FILTER = '[Project] Insert Filter';
export const INSERT_FILTER_SUCCESS = '[Project] Insert Filter Success';
export const INSERT_FILTER_FAIL = '[Project] Insert Filter Fail';

export class AddProjectAction implements Action {
  readonly type = ADD;

  constructor(public payload: Project) {
  }
}

export class AddProjectSuccessAction implements Action {
  readonly type = ADD_SUCCESS;

  constructor(public payload: Project) {
  }
}

export class AddProjectFailAction implements Action {
  readonly type = ADD_FAIL;

  constructor(public payload: string) {
  }
}

export class UpdateProjectAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: Project) {
  }
}

export class UpdateProjectSuccessAction implements Action {
  readonly type = UPDATE_SUCCESS;

  constructor(public payload: Project) {
  }
}

export class UpdateProjectFailAction implements Action {
  readonly type = UPDATE_FAIL;

  constructor(public payload: string) {
  }
}

export class UpdateListsAction implements Action {
  readonly type = UPDATE_LISTS;

  constructor(public payload: Project) {
  }
}

export class UpdateListsSuccessAction implements Action {
  readonly type = UPDATE_LISTS_SUCCESS;

  constructor(public payload: Project) {
  }
}

export class UpdateListsFailAction implements Action {
  readonly type = UPDATE_LISTS_FAIL;

  constructor(public payload: string) {
  }
}

export class DeleteProjectAction implements Action {
  readonly type = DELETE;

  constructor(public payload: Project) {
  }
}

export class DeleteProjectSuccessAction implements Action {
  readonly type = DELETE_SUCCESS;

  constructor(public payload: Project) {
  }
}

export class DeleteProjectFailAction implements Action {
  readonly type = DELETE_FAIL;

  constructor(public payload: string) {
  }
}

export class LoadProjectsAction implements Action {
  readonly type = LOADS;
}

export class LoadProjectsSuccessAction implements Action {
  readonly type = LOADS_SUCCESS;

  constructor(public payload: Project[]) {
  }
}

export class LoadProjectsFailAction implements Action {
  readonly type = LOADS_FAIL;

  constructor(public payload: string) {
  }
}

export class SelectProjectAction implements Action {
  readonly type = SELECT;

  constructor(public payload: Project) {
  }
}

export class InviteMembersAction implements Action {
  readonly type = INVITE;

  constructor(public payload: { projectId: string; members: User[] }) {
  }
}

export class InviteMembersSuccessAction implements Action {
  readonly type = INVITE_SUCCESS;

  constructor(public payload: Project) {
  }
}

export class InviteMembersFailAction implements Action {
  readonly type = INVITE_FAIL;

  constructor(public payload: string) {
  }
}

export class InsertFilterAction implements Action {
  readonly type = INSERT_FILTER;

  constructor(public payload: Project) {
  }
}

export class InsertFilterSuccessAction implements Action {
  readonly type = INSERT_FILTER_SUCCESS;

  constructor(public payload: Project) {
  }
}

export class InsertFilterFailAction implements Action {
  readonly type = INSERT_FILTER_FAIL;

  constructor(public payload: string) {
  }
}

export type Actions
  = AddProjectAction
  | AddProjectSuccessAction
  | AddProjectFailAction
  | UpdateProjectAction
  | UpdateProjectSuccessAction
  | UpdateProjectFailAction
  | UpdateListsAction
  | UpdateListsSuccessAction
  | UpdateListsFailAction
  | DeleteProjectAction
  | DeleteProjectSuccessAction
  | DeleteProjectFailAction
  | LoadProjectsAction
  | LoadProjectsSuccessAction
  | LoadProjectsFailAction
  | SelectProjectAction
  | InviteMembersAction
  | InviteMembersSuccessAction
  | InviteMembersFailAction
  | InsertFilterAction
  | InsertFilterSuccessAction
  | InsertFilterFailAction
  ;
