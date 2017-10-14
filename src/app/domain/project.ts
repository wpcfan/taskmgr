export interface Project {
  id: string | undefined;
  name: string;
  desc?: string;
  coverImg?: string;
  enabled?: boolean;
  taskListIds?: string[]; // 存储 TaskList ID
  memberIds?: string[]; // 存储成员 key 为 ID， value 为角色
}
