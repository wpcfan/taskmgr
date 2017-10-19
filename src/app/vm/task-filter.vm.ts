import { User } from '../domain';

export interface TaskFilterVM {
  desc?: string;
  priorityVMs: TaskFilterPriorityVM[];
}

export interface TaskFilterPriorityVM {
  label: string;
  value: number;
  checked: boolean;
}

export interface TaskFilterVM1 {
  id: string | undefined;
  projectId: string;
  desc?: string;
  hasOwner: boolean;
  hasPriority: boolean;
  owners?: User[];
  priorityVMs: TaskFilterPriorityVM[];

}
