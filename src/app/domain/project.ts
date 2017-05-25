export interface Project {
  id?: string;
  name: string;
  desc?: string;
  coverImg?: string;
  enabled?: boolean;
  taskLists?: string[]; // 存储 TaskList ID
  members?: string[]; // 存储成员 key 为 ID， value 为角色
}