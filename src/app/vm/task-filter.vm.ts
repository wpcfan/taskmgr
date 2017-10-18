export interface TaskFilterVM {
  desc?: string;
  priorityVMs: TaskFilterPriorityVM[];
}

export interface TaskFilterPriorityVM {
  label: string;
  value: number;
  checked: boolean;
}
