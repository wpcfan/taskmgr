import { User } from '../domain';

export interface TaskHistoryVM {
  id?: string;
  taskId: string;
  icon?: string;
  desc: string;
  date: Date;
}
