import { TaskFilter } from '../domain';
import { TaskFilterVM, TaskFilterPriorityVM } from '../vm';

export const getTaskFilterVM = (taskFilter: TaskFilter): TaskFilterVM => {
  return { title: taskFilter.title, priorityVMs: getPrioritiesVMs(taskFilter.priorities) };
}

export const getTaskFilterByPriority = (taskFilter: TaskFilter, taskFilterPriorityVMs: TaskFilterPriorityVM[]): TaskFilter => {

  const priorities: number[] = taskFilterPriorityVMs.reduce((priorities: number[], priorityVM: TaskFilterPriorityVM) => {
    if (priorityVM.checked)
      return [...priorities, priorityVM.value];
    else
      return [...priorities];
  }, []);
  console.log('<<getTaskFilterByPriority>>', JSON.stringify(priorities));

  return { ...taskFilter, priorities: priorities };
}

const getPrioritiesVMs = (priorities: number[]): TaskFilterPriorityVM[] => {
  let priorityVMs: TaskFilterPriorityVM[] = [
    {
      label: '普通',
      value: 3,
      checked: false,
    },
    {
      label: '重要',
      value: 2,
      checked: false,
    },
    {
      label: '紧急',
      value: 1,
      checked: false,
    },
  ];

  return priorityVMs.map((priorityVM: TaskFilterPriorityVM) => {
    if (priorities.indexOf(priorityVM.value) !== -1) {
      return { ...priorityVM, checked: true };
    }
    else {
      return priorityVM;
    }
  });
}
