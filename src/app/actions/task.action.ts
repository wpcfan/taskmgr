import { Action } from '@ngrx/store';
import { type } from '../utils/type.util';
import { Task, Err } from '../domain';

export const ActionTypes = {
  ADD:             type('[Task] Add'),
  ADD_SUCCESS:     type('[Task] Add Success'),
  ADD_FAIL:        type('[Task] Add Fail'),
  UPDATE:          type('[Task] Update'),
  UPDATE_SUCCESS:  type('[Task] Update Success'),
  UPDATE_FAIL:     type('[Task] Update Fail'),
  DELETE:          type('[Task] Delete'),
  DELETE_SUCCESS:  type('[Task] Delete Success'),
  DELETE_FAIL:     type('[Task] Delete Fail'),  
  LOAD:            type('[Task] Load'),
  LOAD_SUCCESS:    type('[Task] Load Success'),
  LOAD_FAIL:       type('[Task] Load Fail'),
  MOVE:            type('[Task] Move'),
  MOVE_SUCCESS:    type('[Task] Move Success'),
  MOVE_FAIL:       type('[Task] Move Fail'),
  COMPLETE:        type('[Task] Complete'),
  COMPLETE_SUCCESS:type('[Task] Complete Success'),
  COMPLETE_FAIL:   type('[Task] Complete Fail')
};

export class AddTaskAction implements Action {
  type = ActionTypes.ADD;
  constructor(public payload: Task){}
}

export class AddTaskSuccessAction implements Action {
  type = ActionTypes.ADD_SUCCESS;
  constructor(public payload: Task){}
}

export class AddTaskFailAction implements Action {
  type = ActionTypes.ADD_FAIL;
  constructor(public payload: Err){}
}

export class UpdateTaskAction implements Action {
  type = ActionTypes.UPDATE;
  constructor(public payload: Task){}
}

export class UpdateTaskSuccessAction implements Action {
  type = ActionTypes.UPDATE_SUCCESS;
  constructor(public payload: Task){}
}

export class UpdateTaskFailAction implements Action {
  type = ActionTypes.UPDATE_FAIL;
  constructor(public payload: Err){}
}

export class DeleteTaskAction implements Action {
  type = ActionTypes.DELETE;
  constructor(public payload: Task){}
}

export class DeleteTaskSuccessAction implements Action {
  type = ActionTypes.DELETE_SUCCESS;
  constructor(public payload: Task){}
}

export class DeleteTaskFailAction implements Action {
  type = ActionTypes.DELETE_FAIL;
  constructor(public payload: Err){}
}

export class LoadTasksAction implements Action {
  type = ActionTypes.LOAD;
  constructor(public payload: string){}
}

export class LoadTasksSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: Task[]){}
}

export class LoadTasksFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;
  constructor(public payload: Err){}
}

export class MoveTaskAction implements Action {
  type = ActionTypes.MOVE;
  constructor(public payload: {taskId:string; taskListId:string}){}
}

export class MoveTaskSuccessAction implements Action {
  type = ActionTypes.MOVE_SUCCESS;
  constructor(public payload: Task){}
}

export class MoveTaskFailAction implements Action {
  type = ActionTypes.MOVE_FAIL;
  constructor(public payload: Err){}
}

export class CompleteTaskAction implements Action {
  type = ActionTypes.COMPLETE;
  constructor(public payload: Task){}
}

export class CompleteTaskSuccessAction implements Action {
  type = ActionTypes.COMPLETE_SUCCESS;
  constructor(public payload: Task){}
}

export class CompleteTaskFailAction implements Action {
  type = ActionTypes.COMPLETE_FAIL;
  constructor(public payload: Err){}
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
  | LoadTasksFailAction
  | MoveTaskAction
  | MoveTaskSuccessAction
  | MoveTaskFailAction
  | CompleteTaskAction
  | CompleteTaskSuccessAction
  | CompleteTaskFailAction
  ;