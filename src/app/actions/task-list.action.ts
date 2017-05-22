import { Action } from '@ngrx/store';
import { type } from '../utils/type.util';
import { TaskList, Err, Project } from '../domain';

export const ActionTypes = {
  ADD:                    type('[TaskList] Add'),
  ADD_SUCCESS:            type('[TaskList] Add Success'),
  ADD_FAIL:               type('[TaskList] Add Fail'),
  UPDATE:                 type('[TaskList] Update'),
  UPDATE_SUCCESS:         type('[TaskList] Update Success'),
  UPDATE_FAIL:            type('[TaskList] Update Fail'),
  DELETE:                 type('[TaskList] Delete'),
  DELETE_SUCCESS:         type('[TaskList] Delete Success'),
  DELETE_FAIL:            type('[TaskList] Delete Fail'),  
  LOADS:                  type('[TaskList] Load'),
  LOADS_SUCCESS:          type('[TaskList] Load Success'),
  LOADS_FAIL:             type('[TaskList] Load Fail'),
  SWAP_ORDER_SUCCESS:     type('[TaskList] Swap Order Success'),
  SWAP_ORDER_FAIL:        type('[TaskList] Swap Order Fail'),  
  INITIALIZE:             type('[TaskList] Init TaskLists'),
  INITIALIZE_SUCCESS:     type('[TaskList] Init TaskLists Success'),
  INITIALIZE_FAIL:        type('[TaskList] Init TaskLists Fail')
};

export class AddTaskListAction implements Action {
  type = ActionTypes.ADD;
  constructor(public payload: TaskList){}
}

export class AddTaskListSuccessAction implements Action {
  type = ActionTypes.ADD_SUCCESS;
  constructor(public payload: TaskList){}
}

export class AddTaskListFailAction implements Action {
  type = ActionTypes.ADD_FAIL;
  constructor(public payload: Err){}
}

export class UpdateTaskListAction implements Action {
  type = ActionTypes.UPDATE;
  constructor(public payload: TaskList){}
}

export class UpdateTaskListSuccessAction implements Action {
  type = ActionTypes.UPDATE_SUCCESS;
  constructor(public payload: TaskList){}
}

export class UpdateTaskListFailAction implements Action {
  type = ActionTypes.UPDATE_FAIL;
  constructor(public payload: Err){}
}

export class DeleteTaskListAction implements Action {
  type = ActionTypes.DELETE;
  constructor(public payload: TaskList){}
}

export class DeleteTaskListSuccessAction implements Action {
  type = ActionTypes.DELETE_SUCCESS;
  constructor(public payload: TaskList){}
}

export class DeleteTaskListFailAction implements Action {
  type = ActionTypes.DELETE_FAIL;
  constructor(public payload: Err){}
}

export class LoadTaskListsAction implements Action {
  type = ActionTypes.LOADS;
  constructor(public payload: string){}
}

export class LoadTaskListsSuccessAction implements Action {
  type = ActionTypes.LOADS_SUCCESS;
  constructor(public payload: TaskList[]){}
}

export class LoadTaskListsFailAction implements Action {
  type = ActionTypes.LOADS_FAIL;
  constructor(public payload: Err){}
}

export class SwapOrderSuccessAction implements Action {
  type = ActionTypes.SWAP_ORDER_SUCCESS;
  constructor(public payload: any){}
}

export class SwapOrderFailAction implements Action {
  type = ActionTypes.SWAP_ORDER_FAIL;
  constructor(public payload: Err){}
}

export class InitTaskListsAction implements Action {
  type = ActionTypes.INITIALIZE;
  constructor(public payload: Project){}
}

export class InitTaskListsSuccessAction implements Action {
  type = ActionTypes.INITIALIZE_SUCCESS;
  constructor(public payload: Project){}
}

export class InitTaskListsFailAction implements Action{
  type = ActionTypes.INITIALIZE_FAIL;
  constructor(public payload: Err){}
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
  | SwapOrderSuccessAction
  | SwapOrderFailAction
  | InitTaskListsAction
  | InitTaskListsSuccessAction
  | InitTaskListsFailAction;