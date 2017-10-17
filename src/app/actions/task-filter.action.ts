import { Action } from '@ngrx/store';
import { TaskFilter } from '../domain';

export const LOAD = '[TaskFilter] Load';

export const UPDATE = '[TaskFilter] Update';

export class LoadTaskFilterAction implements Action {
  readonly type = LOAD;
}

export class UpdateTaskFilterAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: TaskFilter) {
  }
}

export type Actions
  = LoadTaskFilterAction
  | UpdateTaskFilterAction
  ;
