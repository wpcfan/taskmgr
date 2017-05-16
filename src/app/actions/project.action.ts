import { Action } from '@ngrx/store';
import { type } from '../utils/type.util';
import { User, Project, Err } from '../domain';

export const ActionTypes = {
  ADD:                           type('[Project] Add'),
  ADD_SUCCESS:                   type('[Project] Add Success'),
  ADD_FAIL:                      type('[Project] Add Fail'),
  UPDATE:                        type('[Project] Update'),
  UPDATE_SUCCESS:                type('[Project] Update Success'),
  UPDATE_FAIL:                   type('[Project] Update Fail'),
  DELETE:                        type('[Project] Delete'),
  DELETE_SUCCESS:                type('[Project] Delete Success'),
  DELETE_FAIL:                   type('[Project] Delete Fail'),  
  LOADS:                         type('[Project] Load'),
  LOADS_SUCCESS:                 type('[Project] Load Success'),
  LOADS_FAIL:                    type('[Project] Load Fail'),
  SELECT:                        type('[Project] Select Project'),
  LOAD_USERS_BY_PRJ:             type('[User] Load Users By Projects'),  
  LOAD_USERS_BY_PRJ_SUCCESS:     type('[User] Load Users By Projects Success'),  
  LOAD_USERS_BY_PRJ_FAIL:        type('[User] Load Users By Projects Fail'),  
};

export class AddProjectAction implements Action {
  type = ActionTypes.ADD;
  constructor(public payload: Project){}
}

export class AddProjectSuccessAction implements Action {
  type = ActionTypes.ADD_SUCCESS;
  constructor(public payload: Project){}
}

export class AddProjectFailAction implements Action {
  type = ActionTypes.ADD_FAIL;
  constructor(public payload: Err){}
}

export class UpdateProjectAction implements Action {
  type = ActionTypes.UPDATE;
  constructor(public payload: Project){}
}

export class UpdateProjectSuccessAction implements Action {
  type = ActionTypes.UPDATE_SUCCESS;
  constructor(public payload: Project){}
}

export class UpdateProjectFailAction implements Action {
  type = ActionTypes.UPDATE_FAIL;
  constructor(public payload: Err){}
}

export class DeleteProjectAction implements Action {
  type = ActionTypes.DELETE;
  constructor(public payload: Project){}
}

export class DeleteProjectSuccessAction implements Action {
  type = ActionTypes.DELETE_SUCCESS;
  constructor(public payload: Project){}
}

export class DeleteProjectFailAction implements Action {
  type = ActionTypes.DELETE_FAIL;
  constructor(public payload: Err){}
}

export class LoadProjectsAction implements Action {
  type = ActionTypes.LOADS;
  constructor(public payload: any){}
}

export class LoadProjectsSuccessAction implements Action {
  type = ActionTypes.LOADS_SUCCESS;
  constructor(public payload: Project[]){}
}

export class LoadProjectsFailAction implements Action {
  type = ActionTypes.LOADS_FAIL;
  constructor(public payload: Err){}
}

export class SelectProjectAction implements Action {
  type = ActionTypes.SELECT;
  constructor(public payload: Project){}
}

export class LoadUsersByPrjAction implements Action {
  type = ActionTypes.LOAD_USERS_BY_PRJ;

  constructor(public payload: string) { }
}

export class LoadUsersByPrjSuccessAction implements Action {
  type = ActionTypes.LOAD_USERS_BY_PRJ_SUCCESS;

  constructor(public payload: User[]) { }
}

export class LoadUsersByPrjFailAction implements Action {
  type = ActionTypes.LOAD_USERS_BY_PRJ_FAIL;

  constructor(public payload: Err) { }
}

export type Actions
  = AddProjectAction
  | AddProjectSuccessAction
  | AddProjectFailAction
  | UpdateProjectAction
  | UpdateProjectSuccessAction
  | UpdateProjectFailAction
  | DeleteProjectAction
  | DeleteProjectSuccessAction
  | DeleteProjectFailAction
  | LoadProjectsAction
  | LoadProjectsSuccessAction
  | LoadProjectsFailAction
  | SelectProjectAction
  | LoadUsersByPrjAction
  | LoadUsersByPrjSuccessAction
  | LoadUsersByPrjFailAction
  ;