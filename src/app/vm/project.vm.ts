import { TaskList } from '../domain/task-list';
import { User } from '../domain/user';

export interface ProjectVM {
  id: string | null;
  name: string;
  desc?: string;
  coverImg?: string;
  enabled?: boolean;
  taskLists?: TaskList[];
  members?: User[];
}
