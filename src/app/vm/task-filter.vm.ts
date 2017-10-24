import { User } from '../domain';

export interface TaskFilterVM {
  id: string | undefined;
  projectId: string;
  desc?: string;
  hasOwner: boolean;
  hasPriority: boolean;
  ownerVMs: TaskFilterOwnerVM[];
  priorityVMs: TaskFilterPriorityVM[];
  categoryVMs: TaskFilterCategoryVM[];
}

export interface TaskFilterCategoryVM {
  label: string;
  value: string;
  checked: boolean;
}

export interface TaskFilterOwnerVM {
  owner?: User;
  checked: boolean;
}

export interface TaskFilterPriorityVM {
  label: string;
  value: number;
  checked: boolean;
}
