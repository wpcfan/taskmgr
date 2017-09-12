import { User } from '../domain/user';
import { Operation } from '../domain/history';

export interface OperationHistoryVM {
  id?: string;
  operator: User;
  date: Date;
}

export interface TaskHistoryVM extends OperationHistoryVM {
  taskId: string;
  operation: Operation;
}
