import { Action } from '@ngrx/store';
import { TaskHistory } from '../domain';

export const CREATE_TASK = '[History] Create Task';
export const CREATE_TASK_SUCCESS = '[History] Create Task Success';
export const CREATE_TASK_FAIL = '[History] Create Task Fail';

export class CreateTaskAction implements Action {
  readonly type = CREATE_TASK;

  constructor(public payload: TaskHistory) {
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
  = CreateTaskAction
  | CreateTaskSuccessAction
  | CreateTaskFailAction
  ;
