export interface TaskList {
  id: string | undefined;
  name: string;
  projectId: string;
  order: number;
  taskIds?: string[];
}
