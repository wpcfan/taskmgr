import { TaskFilterVM, TaskFilterPriorityVM, TaskFilterOwnerVM, TaskVM } from '../vm';
import { User } from '../domain';

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
    return true;
  });

  return newTasks;
}

export const getUpdateTaskFilterVMByPriority = (taskFilterVM: TaskFilterVM, checkedPriorityVM: TaskFilterPriorityVM): TaskFilterVM => {
  let priorityVMs: TaskFilterPriorityVM[] = taskFilterVM.priorityVMs;
  priorityVMs = priorityVMs.map((priorityVM: TaskFilterPriorityVM) => {
    return priorityVM.value === checkedPriorityVM.value ? { ...priorityVM, checked: !priorityVM.checked } : priorityVM;
  });

  return { ...taskFilterVM, priorityVMs: priorityVMs };
}

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

export const getDefaultOwnerVMs = (): TaskFilterOwnerVM[] => {
  return [{ checked: false }];
}

export const getOwnerVMs = (owners: User[]): TaskFilterOwnerVM[] => {
  const defaultOwnerVMs: TaskFilterOwnerVM[] = getDefaultOwnerVMs();
  const ownerVMs: TaskFilterOwnerVM[] = owners.map((owner: User) => {
    return { owner: owner, checked: false };
  });

  return [...defaultOwnerVMs, ...ownerVMs];
}
