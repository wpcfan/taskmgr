import * as History from '../domain/history';
import { TaskHistoryVM } from '../vm';

export const getTaskHistoryVMs = (histories: History.TaskHistory[]): TaskHistoryVM[] => {
  return histories.map((history: History.TaskHistory) => {
    switch (history.operation.type) {
      case History.CREATE_TASK:
        return {
          ...history,
          icon: 'create-task',
          desc: `${history.operator.name} 创建了任务`,
        };
      default:
        return {
          ...history,
          desc: '未知类型'
        }
    }
  });
};
