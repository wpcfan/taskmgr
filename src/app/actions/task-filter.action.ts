import { Action } from '@ngrx/store';
import { TaskFilter } from '../domain';

export const LOAD = '[TaskFilter] Load';
export const LOAD_SUCCESS = '[TaskFilter] Success';
export const LOAD_FAIL = '[TaskFilter] Fail';

export const ADD = '[TaskFilter] Add';
export const ADD_SUCCESS = '[TaskFilter] Add Success';
export const ADD_FAIL = '[TaskFilter] Add Fail';

export const UPDATE = '[TaskFilter] Update';
export const UPDATE_SUCCESS = '[TaskFilter] Update Succecss';
export const UPDATE_FAIL = '[TaskFilter] Update Fail';

export class LoadTaskFilterAction implements Action {
  readonly type = LOAD;

  constructor(public payload: string) {
  }
}

export class LoadTaskFilterSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: TaskFilter) {
  }
}

export class LoadTaskFilterFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: string) {
  }
}

export class AddTaskFilterAction implements Action {
  readonly type = ADD;

  constructor(public payload: TaskFilter) {
  }
}

export class AddTaskSuccessFilterAction implements Action {
  readonly type = ADD_SUCCESS;

  constructor(public payload: TaskFilter) {
  }
}

export class AddTaskFailFilterAction implements Action {
  readonly type = ADD_FAIL;

  constructor(public payload: string) {
  }
}

export class UpdateTaskFilterAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: TaskFilter) {
  }
}

export class UpdateTaskFilterSuccessAction implements Action {
  readonly type = UPDATE_SUCCESS;

  constructor(public payload: TaskFilter) {
  }
}

export class UpdateTaskFilterFailAction implements Action {
  readonly type = UPDATE_FAIL;

  constructor(public payload: string) {
  }
}

export type Actions
  = LoadTaskFilterAction
  | LoadTaskFilterSuccessAction
  | LoadTaskFilterFailAction
  | AddTaskFilterAction
  | AddTaskSuccessFilterAction
  | AddTaskFailFilterAction
  | UpdateTaskFilterAction
  | UpdateTaskFilterSuccessAction
  | UpdateTaskFilterFailAction
  ;
