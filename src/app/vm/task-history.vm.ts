import { User } from '../domain';

export interface TaskHistoryVM {
  id?: string;
  taskId: string;
  icon?: string;
  title: string;
  content?: string;
  date: Date;
  dateDesc: string,
}
