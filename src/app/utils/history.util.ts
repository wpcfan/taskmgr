import { TaskHistoryVM } from '../vm';
import { User } from '../domain';
import * as DateFns from 'date-fns';
import * as History from '../domain/history';

const getDayName = (day: number): string => {
  const dayNames: string[] = ['一', '二', '三', '四', '五', '六', '日'];
  return dayNames[day - 1];
};

const joinUserNames = (users: User[]): string => {
  const names = users.map((user: User) => user.name);
  return names.join(', ');
};

const getDateDesc = (date: Date | string): string => {
  const nowDate: Date = new Date();
  const historyDate = typeof date === 'string' ? DateFns.parseISO(date) : date;
  const todayDate: Date = new Date(
    nowDate.getFullYear(),
    nowDate.getMonth(),
    nowDate.getDate()
  );
  const yesterdayDate: Date = new Date(
    todayDate.getTime() - 24 * 60 * 60 * 1000
  );
  const thisWeekDate: Date = new Date(
    todayDate.getTime() - (nowDate.getDay() - 1) * 24 * 60 * 60 * 1000
  );
  const lastWeekDate: Date = new Date(
    thisWeekDate.getTime() - 7 * 24 * 60 * 60 * 1000
  );

  const nowTimestamp: number = nowDate.getTime();
  const historyTimestamp: number = historyDate.getTime();
  const deltaTimestamp: number = nowTimestamp - historyTimestamp;

  if (deltaTimestamp < 60 * 1000) {
    return '几秒前';
  } else if (deltaTimestamp < 60 * 60 * 1000) {
    return `${(deltaTimestamp / 1000 / 60).toFixed(0)}分钟前`;
  }

  if (
    DateFns.format(nowDate, 'yyyy-MM-dd') ===
    DateFns.format(historyDate, 'yyyy-MM-dd')
  ) {
    return `今天 ${DateFns.format(historyDate, 'HH:mm')}`;
  }

  if (
    DateFns.format(yesterdayDate, 'yyyy-MM-dd') ===
    DateFns.format(historyDate, 'yyyy-MM-dd')
  ) {
    return `昨天 ${DateFns.format(historyDate, 'HH:mm')}`;
  }

  if (
    DateFns.format(thisWeekDate, 'yyyy-MM w') ===
    DateFns.format(historyDate, 'yyyy-MM w')
  ) {
    return `本周${getDayName(historyDate.getDay())} ${DateFns.format(
      historyDate,
      'HH:mm'
    )}`;
  }

  if (
    DateFns.format(lastWeekDate, 'yyyy-MM w') ===
    DateFns.format(historyDate, 'yyyy-MM w')
  ) {
    return `上周${getDayName(historyDate.getDay())} ${DateFns.format(
      historyDate,
      'HH:mm'
    )}`;
  }

  return typeof date === 'string' ? date : DateFns.format(date, 'M月d日 H:mm');
};

export const getTaskHistoryVMs = (
  histories: History.TaskHistory[]
): TaskHistoryVM[] => {
  return histories.map((history: History.TaskHistory) => {
    switch (history.operation.type) {
      case History.CREATE_TASK:
        return {
          ...history,
          icon: 'add',
          title: `${history.operator.name} 创建了任务`,
          dateDesc: getDateDesc(history.date)
        };
      case History.COMPLETE_TASK:
        return {
          ...history,
          icon: 'done',
          title: `${history.operator.name} 完成了任务`,
          dateDesc: getDateDesc(history.date)
        };
      case History.RECREATE_TASK:
        return {
          ...history,
          icon: 'redo',
          title: `${history.operator.name} 重做了任务`,
          dateDesc: getDateDesc(history.date)
        };
      case History.UPDATE_TASK_CONTENT: {
        const content: string = (<History.UpdateTaskContentOperation>(
          history.operation
        )).payload;
        return {
          ...history,
          icon: 'create',
          title: `${history.operator.name} 更新了内容`,
          content: content,
          dateDesc: getDateDesc(history.date)
        };
      }
      case History.UPDATE_TASK_PRIORITY: {
        let priority: string;
        switch (
          (<History.UpdateTaskPriorityOperation>history.operation).payload
        ) {
          case 1:
            priority = '紧急';
            break;
          case 2:
            priority = '重要';
            break;
          default:
            priority = '普通';
            break;
        }
        return {
          ...history,
          icon: 'priority_high',
          title: `${history.operator.name} 更新任务优先级为 ${priority}`,
          dateDesc: getDateDesc(history.date)
        };
      }
      case History.UPDATE_TASK_REMARK: {
        const content: string = (<History.UpdateTaskRemarkOperation>(
          history.operation
        )).payload;
        return {
          ...history,
          icon: 'create',
          title: `${history.operator.name} 更新了备注`,
          content: content,
          dateDesc: getDateDesc(history.date)
        };
      }
      case History.CLEAR_TASK_REMARK: {
        return {
          ...history,
          icon: 'clear',
          title: `${history.operator.name} 清空了备注`,
          dateDesc: getDateDesc(history.date)
        };
      }
      case History.UPDATE_TASK_DUEDATE: {
        const dueDate: Date = (<History.UpdateTaskDueDateOperation>(
          history.operation
        )).payload;
        return {
          ...history,
          icon: 'date_range',
          title: `${history.operator.name} 更新截止时间为 ${DateFns.format(
            dueDate,
            'M月d日'
          )}`,
          dateDesc: getDateDesc(history.date)
        };
      }
      case History.CLEAR_TASK_DUEDATE: {
        return {
          ...history,
          icon: 'date_range',
          title: `${history.operator.name} 清除了截止时间`,
          dateDesc: getDateDesc(history.date)
        };
      }
      case History.CLAIM_TASK: {
        return {
          ...history,
          icon: 'person',
          title: `${history.operator.name} 认领了任务`,
          dateDesc: getDateDesc(history.date)
        };
      }
      case History.ASSIGN_TASK: {
        const name = (<History.AssignTaskOperation>history.operation).payload
          .name;
        return {
          ...history,
          icon: 'person',
          title: `${history.operator.name} 指派给了 ${name}`,
          dateDesc: getDateDesc(history.date)
        };
      }
      case History.REMOVE_TASK_EXECUTOR: {
        return {
          ...history,
          icon: 'person',
          title: `${history.operator.name} 移除了执行者`,
          dateDesc: getDateDesc(history.date)
        };
      }
      case History.ADD_PARTICIPANT: {
        const users: User[] = (<History.AddParticipantOperation>(
          history.operation
        )).payload;
        return {
          ...history,
          icon: 'person',
          title: `${history.operator.name} 添加了参与者 ${joinUserNames(
            users
          )}`,
          dateDesc: getDateDesc(history.date)
        };
      }
      case History.REMOVE_PARTICIPANT: {
        const users: User[] = (<History.RemoveParticipantOperation>(
          history.operation
        )).payload;
        return {
          ...history,
          icon: 'person',
          title: `${history.operator.name} 移除了参与者 ${joinUserNames(
            users
          )}`,
          dateDesc: getDateDesc(history.date)
        };
      }
      default:
        return {
          ...history,
          title: '未知类型',
          dateDesc: getDateDesc(history.date)
        };
    }
  });
};
