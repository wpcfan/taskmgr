export interface Err {
  timestamp?: Date;
  status?: number;
  error?: string;
  exception?: string;
  message?: string;
  path?: string;
}

export interface Auth {
  user?: User;
  err?: Err;
  token?: string;
}

export interface User {
  id?: string;
  email: string;
  name?: string;
  password?: string;
  projectIds?: string[];
}

export interface Quote{
  id?: string;
  cn: string;
  en: string;
  pic: string;
}

export interface TaskDiscussion{
  id: string;
  taskId: string;
  message: string;
  senderId: string;
  sentDate: Date;
}

export interface Task{
  id?: string;
  taskListId: string;
  desc: string;
  completed: boolean;
  ownerId: string;
  participantIds: string[];
  dueDate?: Date;
  priority: number;
  order: number;
  remark?: string;
  // tags?: string[];
  reminder?: Date;
  createDate: Date;
}

export interface TaskList{
  id?: string;
  name: string;
  projectId: string;
  order: number;
  taskIds?: string[];
}

export interface Project{
  id?: string;
  name: string;
  desc?: string;
  coverImg?: string;
  enabled?: boolean;
  archived?: boolean;
  taskLists?: string[]; // 存储 TaskList ID
  members?: string[]; // 存储成员 key 为 ID， value 为角色
}

export interface ConfirmDialog{
  title: string;
  content: string;
  confirmAction: string;
}