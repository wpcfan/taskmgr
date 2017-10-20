import { Action } from '@ngrx/store';
import { TaskFilterVM } from '../vm';

export const UPDATE = '[TaskFilterVM] Update';

export class UpdateTaskFilterVMAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: TaskFilterVM) {
  }
}

export type Actions
  = UpdateTaskFilterVMAction
  ;
