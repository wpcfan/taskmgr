export interface TaskFilter {
  desc?: string;
  priorities: number[];
}

export interface TaskFilter1 {
  id: string | undefined;
  projectId: string;
  hasOwner: boolean;
  hasPriority: boolean;
}

