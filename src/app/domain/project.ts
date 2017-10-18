import { TaskList } from './task-list';
import { User } from './user';
export interface Project {
  id: string | undefined;
  name: string;
  desc: string | undefined;
  coverImg: string;
  enabled: boolean;
  archived: boolean;
  taskListIds: string[]; // 存储 TaskList ID
  memberIds: string[]; // 存储成员 key 为 ID， value 为角色
  taskLists: TaskList[] | undefined;
  members: User[] | undefined;
}
