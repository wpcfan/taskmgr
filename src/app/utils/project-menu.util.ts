import {
  TaskVM,
  TaskListVM,
  TaskHistoryVM
} from '../vm';
import { TaskHistory } from '../domain';
import { getDateDesc } from './history.util';
import * as DateFns from 'date-fns';
import * as History from '../domain/history';


export const getUnassignedTasks = (taskListVMs: TaskListVM[]): TaskVM[] => {
  //Get All Tasks
  let taskVMs: TaskVM[] = taskListVMs.reduce((acc: TaskVM[], value: TaskListVM) => {
    return [...acc, ...value.tasks];
  }, []);

  //Filter Unassigned Tasks (No Owner & Not Completed)
  taskVMs = taskVMs.filter((taskVM: TaskVM) => !taskVM.owner && !taskVM.completed);

  //Sort By Create Date
  taskVMs = taskVMs.sort((currentTask: TaskVM, nextTask: TaskVM) => {
    const currentTimestamp: number = new Date(<Date>currentTask.createDate).getTime();
    const nextTimestamp: number = new Date(<Date>nextTask.createDate).getTime();
    return currentTimestamp - nextTimestamp;
  });

  return taskVMs;
}

export const getTodayTasks = (taskListVMs: TaskListVM[]): TaskVM[] => {
  //Get All Tasks
  let taskVMs: TaskVM[] = taskListVMs.reduce((acc: TaskVM[], value: TaskListVM) => {
    return [...acc, ...value.tasks];
  }, []);

  //Filter Today Tasks (DueDate <= TodayDate & Not Completed)
  taskVMs = taskVMs.filter((taskVM: TaskVM) => {
    if (taskVM.dueDate && !taskVM.completed) {
      const nowDate: Date = new Date();
      const todayDate: Date = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());

      return todayDate.getTime() >= new Date(taskVM.dueDate).getTime();
    }
    return false;
  });

  //Sort By Create Date
  taskVMs = taskVMs.sort((currentTask: TaskVM, nextTask: TaskVM) => {
    const currentTimestamp: number = new Date(<Date>currentTask.createDate).getTime();
    const nextTimestamp: number = new Date(<Date>nextTask.createDate).getTime();
    return currentTimestamp - nextTimestamp;
  });

  return taskVMs;
}

export const getOwnerAvatar = (taskVM: TaskVM): string => {
  return taskVM.owner ? <string>taskVM.owner.avatar : 'unassigned';
}

export const getDueDateDesc = (date: Date): string => {
  const nowDate: Date = new Date();
  const dueDate: Date = new Date(date);
  const todayDate: Date = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
  const yesterdayDate: Date = new Date(todayDate.getTime() - 24 * 60 * 60 * 1000);
  const thisWeekDate: Date = new Date(todayDate.getTime() - (nowDate.getDay() === 0 ? 6 : nowDate.getDay() - 1) * 24 * 60 * 60 * 1000);
  const lastWeekDate: Date = new Date(thisWeekDate.getTime() - 7 * 24 * 60 * 60 * 1000);

  const dueTimestamp: number = dueDate.getTime();
  const thisWeekTimestamp: number = thisWeekDate.getTime();
  const lastWeekTimestamp: number = lastWeekDate.getTime();

  if (DateFns.format(nowDate, 'YYYY-MM-DD') === DateFns.format(dueDate, 'YYYY-MM-DD')) {
    return `今天 截止`;
  }

  if (DateFns.format(yesterdayDate, 'YYYY-MM-DD') === DateFns.format(dueDate, 'YYYY-MM-DD')) {
    return `昨天 截止`;
  }

  if (dueTimestamp >= thisWeekTimestamp) {
    return `本周${getDayName(dueDate.getDay())} 截止`;
  }

  if (dueTimestamp >= lastWeekTimestamp && dueTimestamp < thisWeekTimestamp) {
    return `上周${getDayName(dueDate.getDay())} 截止`;
  }

  return DateFns.format(date, 'M月D日 截止');
}

const getDayName = (day: number): string => {
  const dayNames: string[] = ['日', '一', '二', '三', '四', '五', '六'];
  return dayNames[day];
}

export const isPastDate = (date: Date): boolean => {
  const nowDate: Date = new Date();
  const todayDate: Date = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());

  let dueDate: Date = new Date(date);
  dueDate = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());

  return todayDate.getTime() > dueDate.getTime();
}

export const isTodayDate = (date: Date): boolean => {
  const nowDate: Date = new Date();
  const todayDate: Date = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());

  return DateFns.format(nowDate, 'YYYY-MM-DD') === DateFns.format(new Date(date), 'YYYY-MM-DD');
}

export const isFutureDate = (date: Date): boolean => {
  const nowDate: Date = new Date();
  const todayDate: Date = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());

  let dueDate: Date = new Date(date);
  dueDate = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());

  return todayDate.getTime() < dueDate.getTime();
}

export const getProjectTaskHistories = (taskHistories: TaskHistory[]): TaskHistory[] => {
  let histories: TaskHistory[] = taskHistories.filter((taskHistory: TaskHistory) => {
    switch (taskHistory.operation.type) {
      case History.CREATE_TASK:
      case History.COMPLETE_TASK:
      case History.RECREATE_TASK:
        return true;
      default:
        return false;
    }
  });

  histories = histories.sort((currentHistory: TaskHistory, nextHistory: TaskHistory) => {
    const currentTimestamp: number = new Date(<Date>currentHistory.date).getTime();
    const nextTimestamp: number = new Date(<Date>nextHistory.date).getTime();
    return nextTimestamp - currentTimestamp;
  })

  return histories;
}

export const getProjectTaskHistoryVMs = (histories: TaskHistory[]): TaskHistoryVM[] => {
  return histories.map((history: TaskHistory) => {
    switch (history.operation.type) {
      case History.CREATE_TASK:
        return {
          ...history,
          name: `${history.operator.name}`,
          title: `创建了任务 ${history.operation.payload}`,
          dateDesc: getDateDesc(history.date),
        };
      case History.COMPLETE_TASK:
        return {
          ...history,
          name: `${history.operator.name}`,
          title: `完成了任务 ${history.operation.payload}`,
          dateDesc: getDateDesc(history.date),
        };
      case History.RECREATE_TASK:
        return {
          ...history,
          name: `${history.operator.name}`,
          title: `重做了任务 ${history.operation.payload}`,
          dateDesc: getDateDesc(history.date),
        };
      default:
        return {
          ...history,
          name: `${history.operator.name}`,
          title: `未知操作`,
          dateDesc: getDateDesc(history.date),
        };
    }
  });
}
