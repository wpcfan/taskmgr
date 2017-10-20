import { TaskFilter } from '../domain';
import { TaskFilterVM, TaskFilterPriorityVM, TaskVM } from '../vm';

export const getTasksByFilterVM = (tasks: TaskVM[], filterVM: TaskFilterVM): TaskVM[] => {

  const newTasks: TaskVM[] = tasks.filter((task: TaskVM) => {
    /** Desc */
    if (filterVM.desc) {
      if (task.desc.indexOf(filterVM.desc) === -1) {
        return false;
      }
    }

    /** Priority */
    const priorityVMCheckeds: TaskFilterPriorityVM[] = filterVM.priorityVMs.filter((priorityVM: TaskFilterPriorityVM) => priorityVM.checked);
    if (priorityVMCheckeds.length > 0) {
      if (priorityVMCheckeds.filter((priorityVM: TaskFilterPriorityVM) => priorityVM.value === task.priority).length === 0)
        return false;
    }

    // if (filterVM.priorities.length > 0) {
    //   if (filterVM.priorities.indexOf(task.priority) === -1)
    //     return false;
    // }

    return true;
  });

  return newTasks;
}

// export const getTaskFilterVM = (taskFilter: TaskFilter): TaskFilterVM => {
//   return { desc: taskFilter.desc, priorityVMs: getPrioritiesVMs(taskFilter.priorities) };
// }

// export const getTaskFilterByDesc = (taskFilter: TaskFilter, desc: string): TaskFilter => {
//   return { ...taskFilter, desc: desc };
// }

// export const getTaskFilterByPriority = (taskFilter: TaskFilter, taskFilterPriorityVMs: TaskFilterPriorityVM[]): TaskFilter => {

//   const priorities: number[] = taskFilterPriorityVMs.reduce((priorities: number[], priorityVM: TaskFilterPriorityVM) => {
//     if (priorityVM.checked)
//       return [...priorities, priorityVM.value];
//     else
//       return [...priorities];
//   }, []);

//   return { ...taskFilter, priorities: priorities };
// }

export const getDefaultPrioritiesVMs = (): TaskFilterPriorityVM[] => {
  return [
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
