export interface TaskFilter {
  id: string | undefined;
  projectId: string;
  sort: string;
  hasOwner: boolean;
  hasDueDate: boolean;
  hasPriority: boolean;
}
