import { Action } from '@ngrx/store';
import { TaskHistory, TaskOperations } from '../domain';

export const LOAD = '[TaskHistory] Load';
export const LOAD_SUCCESS = '[TaskHistory] Load Success';
export const LOAD_FAIL = '[TaskHistory] Load Fail';

export const ADD = '[TaskHistory] Add';
export const ADD_SUCCESS = '[TaskHistory] Add Success';
export const ADD_FAIL = '[TaskHistory] Add Fail';

export class LoadTaskHistoryAction implements Action {
  readonly type = LOAD;

  constructor(public payload: string) {
  }
}

export class LoadHistorySuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: TaskHistory[]) {
  }
}

export class LoadHistoryFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: string) {
  }
}

export class AddTaskHistoryAction implements Action {
  readonly type = ADD;

  constructor(public payload: { taskId: string, operation: TaskOperations }) {
  }
}

export class AddTaskHistorySuccessAction implements Action {
  readonly type = ADD_SUCCESS;

  constructor(public payload: TaskHistory) {
  }
}

export class AddTaskHistoryFailAction implements Action {
  readonly type = ADD_FAIL;

  constructor(public payload: string) {
  }
}

export type Actions
  = LoadTaskHistoryAction
  | LoadHistorySuccessAction
  | LoadHistoryFailAction
  | AddTaskHistoryAction
  | AddTaskHistorySuccessAction
  | AddTaskHistoryFailAction
  ;
