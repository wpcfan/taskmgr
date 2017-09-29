import {Action} from '@ngrx/store';
import {Project, TaskList} from '../domain';

export const ADD = '[TaskList] Add';
export const ADD_SUCCESS = '[TaskList] Add Success';
export const ADD_FAIL = '[TaskList] Add Fail';
export const UPDATE = '[TaskList] Update';
export const UPDATE_SUCCESS = '[TaskList] Update Success';
export const UPDATE_FAIL = '[TaskList] Update Fail';
export const DELETE = '[TaskList] Delete';
export const DELETE_SUCCESS = '[TaskList] Delete Success';
export const DELETE_FAIL = '[TaskList] Delete Fail';
export const LOADS = '[TaskList] Load';
export const LOADS_SUCCESS = '[TaskList] Load Success';
export const LOADS_FAIL = '[TaskList] Load Fail';
export const SWAP_ORDER = '[TaskList] Swap Order';
export const SWAP_ORDER_SUCCESS = '[TaskList] Swap Order Success';
export const SWAP_ORDER_FAIL = '[TaskList] Swap Order Fail';
export const INITIALIZE = '[TaskList] Init TaskLists';
export const INITIALIZE_SUCCESS = '[TaskList] Init TaskLists Success';
export const INITIALIZE_FAIL = '[TaskList] Init TaskLists Fail';

export class AddTaskListAction implements Action {
  readonly type = ADD;

  constructor(public payload: TaskList) {
  }
}

export class AddTaskListSuccessAction implements Action {
  readonly type = ADD_SUCCESS;

  constructor(public payload: TaskList) {
  }
}

export class AddTaskListFailAction implements Action {
  readonly type = ADD_FAIL;

  constructor(public payload: string) {
  }
}

export class UpdateTaskListAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: TaskList) {
  }
}

export class UpdateTaskListSuccessAction implements Action {
  readonly type = UPDATE_SUCCESS;

  constructor(public payload: TaskList) {
  }
}

export class UpdateTaskListFailAction implements Action {
  readonly type = UPDATE_FAIL;

  constructor(public payload: string) {
  }
}

export class DeleteTaskListAction implements Action {
  readonly type = DELETE;

  constructor(public payload: TaskList) {
  }
}

export class DeleteTaskListSuccessAction implements Action {
  readonly type = DELETE_SUCCESS;

  constructor(public payload: TaskList) {
  }
}

export class DeleteTaskListFailAction implements Action {
  readonly type = DELETE_FAIL;

  constructor(public payload: string) {
  }
}

export class LoadTaskListsAction implements Action {
  readonly type = LOADS;

  constructor(public payload: string) {
  }
}

export class LoadTaskListsSuccessAction implements Action {
  readonly type = LOADS_SUCCESS;

  constructor(public payload: TaskList[]) {
  }
}

export class LoadTaskListsFailAction implements Action {
  readonly type = LOADS_FAIL;

  constructor(public payload: string) {
  }
}

export class SwapOrderAction implements Action {
  readonly type = SWAP_ORDER;

  constructor(public payload: {src: TaskList; target: TaskList}) {
  }
}

export class SwapOrderSuccessAction implements Action {
  readonly type = SWAP_ORDER_SUCCESS;

  constructor(public payload: TaskList[]) {
  }
}

export class SwapOrderFailAction implements Action {
  readonly type = SWAP_ORDER_FAIL;

  constructor(public payload: string) {
  }
}

export class InitTaskListsAction implements Action {
  readonly type = INITIALIZE;

  constructor(public payload: Project) {
  }
}

export class InitTaskListsSuccessAction implements Action {
  readonly type = INITIALIZE_SUCCESS;

  constructor(public payload: Project) {
  }
}

export class InitTaskListsFailAction implements Action {
  readonly type = INITIALIZE_FAIL;

  constructor(public payload: string) {
  }
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
  | LoadTaskListsFailAction
  | SwapOrderAction
  | SwapOrderSuccessAction
  | SwapOrderFailAction
  | InitTaskListsAction
  | InitTaskListsSuccessAction
  | InitTaskListsFailAction;
