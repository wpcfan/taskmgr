import { User } from '../domain';

export interface TaskFilterVM {
  id: string | undefined;
  projectId: string;
  desc?: string;
  hasOwner: boolean;
  hasPriority: boolean;
  owners?: User[];
  priorityVMs: TaskFilterPriorityVM[];
}

export interface TaskFilterPriorityVM {
  label: string;
  value: number;
  checked: boolean;
}
