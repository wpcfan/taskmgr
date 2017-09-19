import * as History from '../domain/history';
import { TaskHistoryVM } from '../vm';

export const getTaskHistoryVMs = (histories: History.TaskHistory[]): TaskHistoryVM[] => {
  return histories.map((history: History.TaskHistory) => {
    switch (history.operation.type) {
      case History.CREATE_TASK:
        return {
          ...history,
          icon: 'create-task',
          title: `${history.operator.name} 创建了任务`,
        };
      case History.COMPLETE_TASK:
        return {
          ...history,
          icon: 'create-task',
          title: `${history.operator.name} 完成了任务`,
        }
      case History.RECREATE_TASK:
        return {
          ...history,
          icon: 'create-task',
          title: `${history.operator.name} 重做了任务`,
        }
      case History.UPDATE_TASK_CONTENT: {
        const content: string = (<History.UpdateTaskContentOperation>history.operation).payload;
        return {
          ...history,
          icon: 'create-task',
          title: `${history.operator.name} 更新了内容`,
          content: content,
        }
      }
      case History.UPDATE_TASK_PRIORITY: {
        let priority: string;
        switch ((<History.UpdateTaskPriorityOperation>history.operation).payload) {
          case 1:
            priority = '紧急'
            break;
          case 2:
            priority = '重要'
            break;
          default:
            priority = '普通'
            break;
        }
        return {
          ...history,
          icon: 'create-task',
          title: `${history.operator.name} 更新任务优先级为 ${priority}`,
        }
      }
      case History.UPDATE_TASK_REMARK: {
        const content: string = (<History.UpdateTaskRemarkOperation>history.operation).payload;
        return {
          ...history,
          icon: 'create-task',
          title: `${history.operator.name} 更新了备注`,
          content: content,
        }
      }
      default:
        return {
          ...history,
          title: '未知类型'
        }
    }
  });
};
