import {TaskVM} from './task.vm';

export interface TaskListVM {
  id: string | null;
  name: string;
  projectId: string;
  order: number;
  tasks: TaskVM[];
}
