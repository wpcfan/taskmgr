import {
  TaskVM,
  TaskListVM
} from '../vm';
import * as DateFns from 'date-fns';

export const getUnassignedTasks = (taskListVMs: TaskListVM[]): TaskVM[] => {
  let taskVMs: TaskVM[] = taskListVMs.reduce((acc: TaskVM[], value: TaskListVM) => {
    return [...acc, ...value.tasks];
  }, []);

  taskVMs = taskVMs.filter((taskVM: TaskVM) => !taskVM.owner && !taskVM.completed);

  taskVMs = taskVMs.sort((currentTask: TaskVM, nextTask: TaskVM) => {
    const currentTimestamp: number = new Date(<Date>currentTask.createDate).getTime();
    const nextTimestamp: number = new Date(<Date>nextTask.createDate).getTime();
    return currentTimestamp - nextTimestamp;
  });

  return taskVMs;
}

export const getTodayTasks = (taskListVMs: TaskListVM[]): TaskVM[] => {
  let taskVMs: TaskVM[] = taskListVMs.reduce((acc: TaskVM[], value: TaskListVM) => {
    return [...acc, ...value.tasks];
  }, []);

  taskVMs = taskVMs.filter((taskVM: TaskVM) => {
    if (taskVM.dueDate && !taskVM.completed) {
      const nowDate: Date = new Date();
      const todayDate: Date = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());

      return todayDate.getTime() >= new Date(taskVM.dueDate).getTime();
    }
    return false;
  });

  return taskVMs;
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
