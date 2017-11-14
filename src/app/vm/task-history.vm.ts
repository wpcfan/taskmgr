import { User } from '../domain';

export interface TaskHistoryVM {
  id?: string;
  projectId: string;
  taskId: string;
  icon?: string;
  name?: string;
  title: string;
  content?: string;
  date: Date;
  dateDesc: string,
}
