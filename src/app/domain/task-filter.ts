export interface TaskFilter {
  id: string | undefined;
  projectId: string;
  sort: string;
  hasOwner: boolean;
  hasDueDate: boolean;
  hasCreateDate: boolean;
  hasPriority: boolean;
}
