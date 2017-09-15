import { User } from './user';

export const CREATE_TASK = "createTask";
export const COMPLETE_TASK = "completeTask";
export const RECREATE_TASK = "recreateTask";

export const UPDATE_TASK_CONTENT = "updateTaskContent";
export const UPDATE_TASK_PRIORITY = "updatePriority";
export const UPDATE_TASK_REMARK = "updateTaskRemark";

export interface OperationHistory {
  id?: string;
  operator: User;
  date: Date;
}

export interface TaskHistory extends OperationHistory {
  taskId: string;
  operation: TaskOperations;
}

export interface Operation {
  type: string;
}

export class CreateTaskOperation implements Operation {
  readonly type = CREATE_TASK;

  constructor(public payload: string) {
  }
}

export class CompleteTaskOperation implements Operation {
  readonly type = COMPLETE_TASK;
}

export class RecreateTaskOperation implements Operation {
  readonly type = RECREATE_TASK;
}

export class UpdateTaskContentOperation implements Operation {
  readonly type = UPDATE_TASK_CONTENT;

  constructor(public payload: string) {
  }
}

export class UpdatePriorityOperation implements Operation {
  readonly type = UPDATE_TASK_PRIORITY;

  constructor(public payload: number) {
  }
}

export class UpdateRemarkOperation implements Operation {
  readonly type = UPDATE_TASK_REMARK;

  constructor(public payload: string) {
  }
}

export type TaskOperations
  = CreateTaskOperation
  | CompleteTaskOperation
  | RecreateTaskOperation
  | UpdateTaskContentOperation
  | UpdatePriorityOperation
  | UpdateRemarkOperation
  ;
