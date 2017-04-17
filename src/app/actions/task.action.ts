import { Action } from '@ngrx/store';
import { type } from '../utils/type.util';
import * as models from '../domain';

export const ActionTypes = {
  ADD_TASK:             type('[Task] Add'),
  ADD_TASK_SUCCESS:     type('[Task] Add Success'),
  ADD_TASK_FAIL:        type('[Task] Add Fail'),
  UPDATE_TASK:          type('[Task] Update'),
  UPDATE_TASK_SUCCESS:  type('[Task] Update Success'),
  UPDATE_TASK_FAIL:     type('[Task] Update Fail'),
  DELETE_TASK:          type('[Task] Delete'),
  DELETE_TASK_SUCCESS:  type('[Task] Delete Success'),
  DELETE_TASK_FAIL:     type('[Task] Delete Fail'),  
  LOAD_TASKS:           type('[Task] Load'),
  LOAD_TASKS_SUCCESS:   type('[Task] Load Success'),
  LOAD_TASKS_FAIL:      type('[Task] Load Fail')
};

export class AddTaskAction implements Action {
  type = ActionTypes.ADD_TASK;
  constructor(public payload: models.Task){}
}

export class AddTaskSuccessAction implements Action {
  type = ActionTypes.ADD_TASK_SUCCESS;
  constructor(public payload: models.Task){}
}

export class AddTaskFailAction implements Action {
  type = ActionTypes.ADD_TASK_FAIL;
  constructor(public payload: models.Err){}
}

export class UpdateTaskAction implements Action {
  type = ActionTypes.UPDATE_TASK;
  constructor(public payload: models.Task){}
}

export class UpdateTaskSuccessAction implements Action {
  type = ActionTypes.UPDATE_TASK_SUCCESS;
  constructor(public payload: models.Task){}
}

export class UpdateTaskFailAction implements Action {
  type = ActionTypes.UPDATE_TASK_FAIL;
  constructor(public payload: models.Err){}
}

export class DeleteTaskAction implements Action {
  type = ActionTypes.DELETE_TASK;
  constructor(public payload: models.Task){}
}

export class DeleteTaskSuccessAction implements Action {
  type = ActionTypes.DELETE_TASK_SUCCESS;
  constructor(public payload: models.Task){}
}

export class DeleteTaskFailAction implements Action {
  type = ActionTypes.DELETE_TASK_FAIL;
  constructor(public payload: models.Err){}
}

export class LoadTasksAction implements Action {
  type = ActionTypes.LOAD_TASKS;
  constructor(public payload: any){}
}

export class LoadTasksSuccessAction implements Action {
  type = ActionTypes.LOAD_TASKS_SUCCESS;
  constructor(public payload: models.Task[]){}
}

export class LoadTasksFailAction implements Action {
  type = ActionTypes.LOAD_TASKS_FAIL;
  constructor(public payload: models.Err){}
}


export type Actions
  = AddTaskAction
  | AddTaskSuccessAction
  | AddTaskFailAction
  | UpdateTaskAction
  | UpdateTaskSuccessAction
  | UpdateTaskFailAction
  | DeleteTaskAction
  | DeleteTaskSuccessAction
  | DeleteTaskFailAction
  | LoadTasksAction
  | LoadTasksSuccessAction
  | LoadTasksFailAction;