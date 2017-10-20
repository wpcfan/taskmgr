export interface TaskFilter {
  id: string | undefined;
  projectId: string;
  hasOwner: boolean;
  hasPriority: boolean;
}
