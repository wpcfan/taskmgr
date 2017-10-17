export interface TaskFilterVM {
  title?: string;
  priorityVMs: TaskFilterPriorityVM[];
}

export interface TaskFilterPriorityVM {
  label: string;
  value: number;
  checked: boolean;
}
