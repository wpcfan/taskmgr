import { Action } from '@ngrx/store';
import { TaskFilterVM } from '../vm';
import { TaskFilter, User } from '../domain';

export const UPDATE = '[TaskFilterVM] Update';

export const LOAD_OWNERS = '[TaskFilterVM] Load Owners';
export const LOAD_OWNERS_SUCCESS = '[TaskFilterVM] Load Owners Success';
export const LOAD_OWNERS_FAIL = '[TaskFilterVM] Load Owners Fail';

export class UpdateTaskFilterVMAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: TaskFilterVM) {
  }
}

export class LoadTaskFilterOwnersAction implements Action {
  readonly type = LOAD_OWNERS;

  constructor(public payload: TaskFilter) {
  }
}

export class LoadTaskFilterOwnersSuccessAction implements Action {
  readonly type = LOAD_OWNERS_SUCCESS;

  constructor(public payload: User[]) {
  }
}

export class LoadTaskFilterOwnersFailAction implements Action {
  readonly type = LOAD_OWNERS_FAIL;

  constructor(public payload: string) {
  }
}

export type Actions
  = UpdateTaskFilterVMAction
  | LoadTaskFilterOwnersAction
  | LoadTaskFilterOwnersSuccessAction
  | LoadTaskFilterOwnersFailAction
  ;
