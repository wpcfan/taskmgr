import { Action } from '@ngrx/store';
import { TaskHistory, TaskOperations } from '../domain';
import { LoadProjectsSuccessAction } from 'app/actions/project.action';

export const LOAD = '[ProjectHistory] Load';
export const LOAD_SUCCESS = '[ProjectHistory] Load Success';
export const LOAD_FAIL = '[ProjectHistory] Load Fail';

export class LoadProjectHistoryAction implements Action {
  readonly type = LOAD;

  constructor(public payload: string) {
  }
}

export class LoadProjectHistorySuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: TaskHistory[]) {
  }
}

export class LoadProjectHistoryFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: string) {
  }
}

export type Actions
  = LoadProjectHistoryAction
  | LoadProjectHistorySuccessAction
  | LoadProjectHistoryFailAction
