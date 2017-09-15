import { Action } from '@ngrx/store';
import { Task, TaskHistory } from '../domain';

export const LOAD = '[TaskHistory] Load';
export const LOAD_SUCCESS = '[TaskHistory] Load Success';
export const LOAD_FAIL = '[TaskHistory] Load Fail';

export const CREATE_TASK = '[TaskHistory] Create Task';
export const CREATE_TASK_SUCCESS = '[TaskHistory] Create Task Success';
export const CREATE_TASK_FAIL = '[TaskHistory] Create Task Fail';

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

export class CreateTaskAction implements Action {
  readonly type = CREATE_TASK;

  constructor(public payload: Task) {
  }
}

export class CreateTaskSuccessAction implements Action {
  readonly type = CREATE_TASK_SUCCESS;

  constructor(public payload: TaskHistory) {
  }
}

export class CreateTaskFailAction implements Action {
  readonly type = CREATE_TASK_FAIL;

  constructor(public payload: string) {
  }
}

export type Actions
  = LoadTaskHistoryAction
  | LoadHistorySuccessAction
  | LoadHistoryFailAction
  | CreateTaskAction
  | CreateTaskSuccessAction
  | CreateTaskFailAction
  ;
