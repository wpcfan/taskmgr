import { User } from './user';
import { TaskHistory } from './history';

export interface Task {
  id?: string;
  taskListId: string;
  desc: string;
  completed: boolean;
  ownerId: string;
  participantIds: string[];
  dueDate?: Date;
  priority: number;
  // order: number;
  remark?: string;
  // tags?: string[];
  reminder?: Date;
  createDate?: Date;
  history?: TaskHistory[];
}
