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
      case History.COMPLETE_TASK:
        return {
          ...history,
          icon: 'create-task',
          desc: `${history.operator.name} 完成了任务`,
        }
      case History.RECREATE_TASK:
        return {
          ...history,
          icon: 'create-task',
          desc: `${history.operator.name} 重做了任务`,
        }
      case History.UPDATE_TASK_CONTENT:
        const payload: string = (<History.UpdateTaskContentOperation>history.operation).payload;
        return {
          ...history,
          icon: 'create-task',
          desc: `${history.operator.name} 更新了内容`,
        }
      default:
        return {
          ...history,
          desc: '未知类型'
        }
    }
  });
};
