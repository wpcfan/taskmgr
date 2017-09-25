import { User } from './user';

export const CREATE_TASK = "createTask";
export const COMPLETE_TASK = "completeTask";
export const RECREATE_TASK = "recreateTask";

export const UPDATE_TASK_CONTENT = "updateTaskContent";
export const UPDATE_TASK_PRIORITY = "updateTaskPriority";
export const UPDATE_TASK_REMARK = "updateTaskRemark";
export const CLEAR_TASK_REMARK = "clearTaskRemark";
export const UPDATE_TASK_DUEDATE = "updateTaskDueDate";

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

export class UpdateTaskPriorityOperation implements Operation {
  readonly type = UPDATE_TASK_PRIORITY;

  constructor(public payload: number) {
  }
}

export class UpdateTaskRemarkOperation implements Operation {
  readonly type = UPDATE_TASK_REMARK;

  constructor(public payload: string) {
  }
}

export class ClearTaskRemarkOperation implements Operation {
  readonly type = CLEAR_TASK_REMARK;
}

export class UpdateTaskDueDateOperation implements Operation {
  readonly type = UPDATE_TASK_DUEDATE;

  constructor(public payload: Date) {
  }
}

export type TaskOperations
  = CreateTaskOperation
  | CompleteTaskOperation
  | RecreateTaskOperation
  | UpdateTaskContentOperation
  | UpdateTaskPriorityOperation
  | UpdateTaskRemarkOperation
  | ClearTaskRemarkOperation
  | UpdateTaskDueDateOperation
  ;
