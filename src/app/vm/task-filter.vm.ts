import { User } from '../domain';

export interface TaskFilterVM {
  id: string | undefined;
  projectId: string;
  desc?: string;
  sort: string;
  hasOwner: boolean;
  hasDueDate: boolean;
  hasCreateDate: boolean;
  hasPriority: boolean;
  customCreateDate: TaskFilterCustomDate;
  sortVMs: TaskFilterItemVM[];
  ownerVMs: TaskFilterOwnerVM[];
  dueDateVMs: TaskFilterItemVM[];
  createDateVMs: TaskFilterItemVM[];
  priorityVMs: TaskFilterPriorityVM[];
  categoryVMs: TaskFilterItemVM[];
}

export interface TaskFilterItemVM {
  label: string;
  value: string;
  checked: boolean;
  hasExtra?: boolean;
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

export interface TaskFilterCustomDate {
  startDate: Date;
  endDate: Date;
}
