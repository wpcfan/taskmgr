import { Action } from '@ngrx/store';
import { Task, TaskList } from '../domain';

export const SELECT = '[Task] Select';
export const ADD = '[Task] Add';
export const ADD_SUCCESS = '[Task] Add Success';
export const ADD_FAIL = '[Task] Add Fail';
export const UPDATE = '[Task] Update';
export const UPDATE_SUCCESS = '[Task] Update Success';
export const UPDATE_FAIL = '[Task] Update Fail';
export const DELETE = '[Task] Delete';
export const DELETE_SUCCESS = '[Task] Delete Success';
export const DELETE_FAIL = '[Task] Delete Fail';
export const LOAD_IN_LISTS = '[Task] Load In Lists';
export const LOAD_IN_LISTS_SUCCESS = '[Task] Load In Lists Success';
export const LOAD_IN_LISTS_FAIL = '[Task] Load In Lists Fail';
export const MOVE_ALL = '[Task] Move All';
export const MOVE_ALL_SUCCESS = '[Task] Move All Success';
export const MOVE_ALL_FAIL = '[Task] Move All Fail';
export const MOVE = '[Task] Move';
export const MOVE_SUCCESS = '[Task] Move Success';
export const MOVE_FAIL = '[Task] Move Fail';
export const COMPLETE = '[Task] Complete';
export const COMPLETE_SUCCESS = '[Task] Complete Success';
export const COMPLETE_FAIL = '[Task] Complete Fail';

export class SelectTaskAction implements Action {
  readonly type = SELECT;

  constructor(public payload: string) {
  }
}

export class AddTaskAction implements Action {
  readonly type = ADD;

  constructor(public payload: Task) {
  }
}

export class AddTaskSuccessAction implements Action {
  readonly type = ADD_SUCCESS;

  constructor(public payload: Task) {
  }
}

export class AddTaskFailAction implements Action {
  readonly type = ADD_FAIL;

  constructor(public payload: string) {
  }
}

export class UpdateTaskAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: Task) {
  }
}

export class UpdateTaskSuccessAction implements Action {
  readonly type = UPDATE_SUCCESS;

  constructor(public payload: Task) {
  }
}

export class UpdateTaskFailAction implements Action {
  readonly type = UPDATE_FAIL;

  constructor(public payload: string) {
  }
}

export class DeleteTaskAction implements Action {
  readonly type = DELETE;

  constructor(public payload: Task) {
  }
}

export class DeleteTaskSuccessAction implements Action {
  readonly type = DELETE_SUCCESS;

  constructor(public payload: Task) {
  }
}

export class DeleteTaskFailAction implements Action {
  readonly type = DELETE_FAIL;

  constructor(public payload: string) {
  }
}

export class LoadTasksInListsAction implements Action {
  readonly type = LOAD_IN_LISTS;

  constructor(public payload: TaskList[]) {
  }
}

export class LoadTasksInListsSuccessAction implements Action {
  readonly type = LOAD_IN_LISTS_SUCCESS;

  constructor(public payload: Task[]) {
  }
}

export class LoadTasksInListsFailAction implements Action {
  readonly type = LOAD_IN_LISTS_FAIL;

  constructor(public payload: string) {
  }
}

export class MoveTaskAction implements Action {
  readonly type = MOVE;

  constructor(public payload: { taskId: string; taskListId: string }) {
  }
}

export class MoveTaskSuccessAction implements Action {
  readonly type = MOVE_SUCCESS;

  constructor(public payload: Task) {
  }
}

export class MoveTaskFailAction implements Action {
  readonly type = MOVE_FAIL;

  constructor(public payload: string) {
  }
}

export class CompleteTaskAction implements Action {
  readonly type = COMPLETE;

  constructor(public payload: Task) {
  }
}

export class CompleteTaskSuccessAction implements Action {
  readonly type = COMPLETE_SUCCESS;

  constructor(public payload: Task) {
  }
}

export class CompleteTaskFailAction implements Action {
  readonly type = COMPLETE_FAIL;

  constructor(public payload: string) {
  }
}

export class MoveAllAction implements Action {
  readonly type = MOVE_ALL;

  constructor(public payload: { srcListId: string; targetListId: string }) {
  }
}

export class MoveAllSuccessAction implements Action {
  readonly type = MOVE_ALL_SUCCESS;

  constructor(public payload: Task[]) {
  }
}

export class MoveAllFailAction implements Action {
  readonly type = MOVE_ALL_FAIL;

  constructor(public payload: string) {
  }
}

export type Actions
  = SelectTaskAction
  | AddTaskAction
  | AddTaskSuccessAction
  | AddTaskFailAction
  | UpdateTaskAction
  | UpdateTaskSuccessAction
  | UpdateTaskFailAction
  | DeleteTaskAction
  | DeleteTaskSuccessAction
  | DeleteTaskFailAction
  | LoadTasksInListsAction
  | LoadTasksInListsSuccessAction
  | LoadTasksInListsFailAction
  | MoveTaskAction
  | MoveTaskSuccessAction
  | MoveTaskFailAction
  | CompleteTaskAction
  | CompleteTaskSuccessAction
  | CompleteTaskFailAction
  | MoveAllAction
  | MoveAllSuccessAction
  | MoveAllFailAction
  ;
