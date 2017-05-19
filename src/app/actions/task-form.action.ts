import { Action } from '@ngrx/store';
import { type } from '../utils/type.util';
import { Task, Err } from '../domain';

export const ActionTypes = {
  PREPARE_ADD:             type('[TaskForm] Prepare Add Dialog'),
  PREPARE_ADD_SUCCESS:     type('[TaskForm] Prepare Add Dialog Success'),
  PREPARE_ADD_FAIL:        type('[TaskForm] Prepare Add Dialog Fail'),
  PREPARE_UPDATE:          type('[TaskForm] Prepare Update Dialog'),
  PREPARE_UPDATE_SUCCESS:  type('[TaskForm] Prepare Update Dialog Success'),
  PREPARE_UPDATE_FAIL:          type('[TaskForm] Prepare Update Dialog Fail'),
};

export class PrepareAddAction implements Action {
  type = ActionTypes.PREPARE_ADD;
  // pass taskListId
  constructor(public payload: string){}
}

export class PrepareAddSuccessAction implements Action {
  type = ActionTypes.PREPARE_ADD_SUCCESS;
  // pass taskListId
  constructor(public payload: any){}
}

export class PrepareAddFailAction implements Action {
  type = ActionTypes.PREPARE_ADD_FAIL;
  // pass taskListId
  constructor(public payload: Err){}
}

export class PrepareUpdateAction implements Action {
  type = ActionTypes.PREPARE_UPDATE;
  // pass task
  constructor(public payload: Task){}
}

export class PrepareUpdateSuccessAction implements Action {
  type = ActionTypes.PREPARE_UPDATE_SUCCESS;
  // pass task.id
  constructor(public payload: any){}
}

export class PrepareUpdateFailAction implements Action {
  type = ActionTypes.PREPARE_UPDATE_FAIL;
  // pass task.id
  constructor(public payload: string){}
}

export type Actions
  = PrepareAddAction
  | PrepareAddSuccessAction
  | PrepareAddFailAction
  | PrepareUpdateAction
  | PrepareUpdateSuccessAction
  | PrepareUpdateFailAction
  ;