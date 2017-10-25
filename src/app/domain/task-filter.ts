export interface TaskFilter {
  id: string | undefined;
  projectId: string;
  hasOwner: boolean;
  hasDueDate: boolean;
  hasPriority: boolean;
}
