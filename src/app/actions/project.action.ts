import { Action } from '@ngrx/store';
import { type } from '../utils/type.util';
import * as models from '../domain';

export const ActionTypes = {
  ADD_PROJECT:             type('[Project] Add'),
  ADD_PROJECT_SUCCESS:     type('[Project] Add Success'),
  ADD_PROJECT_FAIL:        type('[Project] Add Fail'),
  UPDATE_PROJECT:          type('[Project] Update'),
  UPDATE_PROJECT_SUCCESS:  type('[Project] Update Success'),
  UPDATE_PROJECT_FAIL:     type('[Project] Update Fail'),
  DELETE_PROJECT:          type('[Project] Delete'),
  DELETE_PROJECT_SUCCESS:  type('[Project] Delete Success'),
  DELETE_PROJECT_FAIL:     type('[Project] Delete Fail'),  
  LOAD_PROJECTS:           type('[Project] Load'),
  LOAD_PROJECTS_SUCCESS:   type('[Project] Load Success'),
  LOAD_PROJECTS_FAIL:      type('[Project] Load Fail'),
  SELECT_PROJECT:          type('[Project] Select Project')
};

export class AddProjectAction implements Action {
  type = ActionTypes.ADD_PROJECT;
  constructor(public payload: models.Project){}
}

export class AddProjectSuccessAction implements Action {
  type = ActionTypes.ADD_PROJECT_SUCCESS;
  constructor(public payload: models.Project){}
}

export class AddProjectFailAction implements Action {
  type = ActionTypes.ADD_PROJECT_FAIL;
  constructor(public payload: models.Err){}
}

export class UpdateProjectAction implements Action {
  type = ActionTypes.UPDATE_PROJECT;
  constructor(public payload: models.Project){}
}

export class UpdateProjectSuccessAction implements Action {
  type = ActionTypes.UPDATE_PROJECT_SUCCESS;
  constructor(public payload: models.Project){}
}

export class UpdateProjectFailAction implements Action {
  type = ActionTypes.UPDATE_PROJECT_FAIL;
  constructor(public payload: models.Err){}
}

export class DeleteProjectAction implements Action {
  type = ActionTypes.DELETE_PROJECT;
  constructor(public payload: models.Project){}
}

export class DeleteProjectSuccessAction implements Action {
  type = ActionTypes.DELETE_PROJECT_SUCCESS;
  constructor(public payload: models.Project){}
}

export class DeleteProjectFailAction implements Action {
  type = ActionTypes.DELETE_PROJECT_FAIL;
  constructor(public payload: models.Err){}
}

export class LoadProjectsAction implements Action {
  type = ActionTypes.LOAD_PROJECTS;
  constructor(public payload: any){}
}

export class LoadProjectsSuccessAction implements Action {
  type = ActionTypes.LOAD_PROJECTS_SUCCESS;
  constructor(public payload: {[id: string]: models.Project}){}
}

export class LoadProjectsFailAction implements Action {
  type = ActionTypes.LOAD_PROJECTS_FAIL;
  constructor(public payload: models.Err){}
}

export class SelectProjectAction implements Action {
  type = ActionTypes.SELECT_PROJECT;
  constructor(public payload: models.Project){}
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
  | SelectProjectAction;