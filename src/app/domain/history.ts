import { User } from './user';

export const CREATE_TASK = 'createTask';
export const COMPLETE_TASK = 'completeTask';
export const RECREATE_TASK = 'recreateTask';

export const UPDATE_TASK_CONTENT = 'updateTaskContent';
export const UPDATE_TASK_PRIORITY = 'updateTaskPriority';
export const UPDATE_TASK_REMARK = 'updateTaskRemark';
export const CLEAR_TASK_REMARK = 'clearTaskRemark';
export const UPDATE_TASK_DUEDATE = 'updateTaskDueDate';
export const CLEAR_TASK_DUEDATE = 'clearTaskDueDate';

export const CLAIM_TASK = 'claimTask';
export const ASSIGN_TASK = 'assignTask';
export const REMOVE_TASK_EXECUTOR = 'removeTaskExecutor';

export const ADD_PARTICIPANT = 'addParticipant';
export const REMOVE_PARTICIPANT = 'removeParticipant';

export interface OperationHistory {
  id?: string;
  operator: User;
  date: Date;
}

export interface TaskHistory extends OperationHistory {
  projectId: string;
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

  constructor(public payload: string) {
  }
}

export class RecreateTaskOperation implements Operation {
  readonly type = RECREATE_TASK;

  constructor(public payload: string) {
  }
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

export class ClearTaskDueDateOperation implements Operation {
  readonly type = CLEAR_TASK_DUEDATE;
}

export class ClaimTaskOperation implements Operation {
  readonly type = CLAIM_TASK;
}

export class AssignTaskOperation implements Operation {
  readonly type = ASSIGN_TASK;

  constructor(public payload: User) {
  }
}

export class RemoveTaskExecutorOperation implements Operation {
  readonly type = REMOVE_TASK_EXECUTOR;
}

export class AddParticipantOperation implements Operation {
  readonly type = ADD_PARTICIPANT;

  constructor(public payload: User[]) {
  }
}

export class RemoveParticipantOperation implements Operation {
  readonly type = REMOVE_PARTICIPANT;

  constructor(public payload: User[]) {
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
  | ClearTaskDueDateOperation
  | ClaimTaskOperation
  | AssignTaskOperation
  | RemoveTaskExecutorOperation
  | AddParticipantOperation
  | RemoveParticipantOperation
  ;
