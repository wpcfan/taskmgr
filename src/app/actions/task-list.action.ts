import { Action } from '@ngrx/store';
import { type } from '../utils/type.util';
import * as entities from '../domain';

export const ActionTypes = {
  ADD_TASK_LIST:             type('[TaskList] Add'),
  ADD_TASK_LIST_SUCCESS:     type('[TaskList] Add Success'),
  ADD_TASK_LIST_FAIL:        type('[TaskList] Add Fail'),
  UPDATE_TASK_LIST:          type('[TaskList] Update'),
  UPDATE_TASK_LIST_SUCCESS:  type('[TaskList] Update Success'),
  UPDATE_TASK_LIST_FAIL:     type('[TaskList] Update Fail'),
  DELETE_TASK_LIST:          type('[TaskList] Delete'),
  DELETE_TASK_LIST_SUCCESS:  type('[TaskList] Delete Success'),
  DELETE_TASK_LIST_FAIL:     type('[TaskList] Delete Fail'),  
  LOAD_TASK_LISTS:           type('[TaskList] Load'),
  LOAD_TASK_LISTS_SUCCESS:   type('[TaskList] Load Success'),
  LOAD_TASK_LISTS_FAIL:      type('[TaskList] Load Fail')
};

export class AddTaskListAction implements Action {
  type = ActionTypes.ADD_TASK_LIST;
  constructor(public payload: entities.TaskList){}
}

export class AddTaskListSuccessAction implements Action {
  type = ActionTypes.ADD_TASK_LIST_SUCCESS;
  constructor(public payload: entities.TaskList){}
}

export class AddTaskListFailAction implements Action {
  type = ActionTypes.ADD_TASK_LIST_FAIL;
  constructor(public payload: entities.Err){}
}

export class UpdateTaskListAction implements Action {
  type = ActionTypes.UPDATE_TASK_LIST;
  constructor(public payload: entities.TaskList){}
}

export class UpdateTaskListSuccessAction implements Action {
  type = ActionTypes.UPDATE_TASK_LIST_SUCCESS;
  constructor(public payload: entities.TaskList){}
}

export class UpdateTaskListFailAction implements Action {
  type = ActionTypes.UPDATE_TASK_LIST_FAIL;
  constructor(public payload: entities.Err){}
}

export class DeleteTaskListAction implements Action {
  type = ActionTypes.DELETE_TASK_LIST;
  constructor(public payload: entities.TaskList){}
}

export class DeleteTaskListSuccessAction implements Action {
  type = ActionTypes.DELETE_TASK_LIST_SUCCESS;
  constructor(public payload: entities.TaskList){}
}

export class DeleteTaskListFailAction implements Action {
  type = ActionTypes.DELETE_TASK_LIST_FAIL;
  constructor(public payload: entities.Err){}
}

export class LoadTaskListsAction implements Action {
  type = ActionTypes.LOAD_TASK_LISTS;
  constructor(public payload: any){}
}

export class LoadTaskListsSuccessAction implements Action {
  type = ActionTypes.LOAD_TASK_LISTS_SUCCESS;
  constructor(public payload: entities.TaskList[]){}
}

export class LoadTaskListsFailAction implements Action {
  type = ActionTypes.LOAD_TASK_LISTS_FAIL;
  constructor(public payload: entities.Err){}
}


export type Actions
  = AddTaskListAction
  | AddTaskListSuccessAction
  | AddTaskListFailAction
  | UpdateTaskListAction
  | UpdateTaskListSuccessAction
  | UpdateTaskListFailAction
  | DeleteTaskListAction
  | DeleteTaskListSuccessAction
  | DeleteTaskListFailAction
  | LoadTaskListsAction
  | LoadTaskListsSuccessAction
  | LoadTaskListsFailAction;