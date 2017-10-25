import {
  TaskFilterVM,
  TaskFilterCategoryVM,
  TaskFilterPriorityVM,
  TaskFilterOwnerVM,
  TaskVM
} from '../vm';
import { User, TaskFilter } from '../domain';

export const getTasksByFilterVM = (tasks: TaskVM[], filterVM: TaskFilterVM): TaskVM[] => {

  const newTasks: TaskVM[] = tasks.filter((task: TaskVM) => {
    /** Desc */
    if (filterVM.desc) {
      if (task.desc.indexOf(filterVM.desc) === -1) {
        return false;
      }
    }

    /** Owner */
    if (filterVM.hasOwner) {
      const ownerVMCheckeds: TaskFilterOwnerVM[] = filterVM.ownerVMs.filter((ownerVM: TaskFilterOwnerVM) => ownerVM.checked);
      if (ownerVMCheckeds.length > 0) {
        const matchedOwnerVMs: TaskFilterOwnerVM[] = ownerVMCheckeds.filter((ownerVM: TaskFilterOwnerVM) => {
          if (ownerVM.owner && task.owner) {
            if (ownerVM.owner.id === task.owner.id)
              return true;
          }

          if (!ownerVM.owner && !task.owner)
            return true;

          return false;
        });

        if (matchedOwnerVMs.length === 0)
          return false;
      }
    }

    /** Priority */
    if (filterVM.hasPriority) {
      const priorityVMCheckeds: TaskFilterPriorityVM[] = filterVM.priorityVMs.filter((priorityVM: TaskFilterPriorityVM) => priorityVM.checked);
      if (priorityVMCheckeds.length > 0) {
        if (priorityVMCheckeds.filter((priorityVM: TaskFilterPriorityVM) => priorityVM.value === task.priority).length === 0)
          return false;
      }
    }

    return true;
  });

  return newTasks;
}

export const getUpdateTaskFilterVMByOwner = (taskFilterVM: TaskFilterVM, checkedOwnerVM: TaskFilterOwnerVM): TaskFilterVM => {
  let ownerVMs: TaskFilterOwnerVM[] = taskFilterVM.ownerVMs;
  ownerVMs = ownerVMs.map((ownerVM: TaskFilterOwnerVM) => {
    if (ownerVM.owner && checkedOwnerVM.owner) {
      if (ownerVM.owner.id === checkedOwnerVM.owner.id)
        return { ...ownerVM, checked: !ownerVM.checked };
    }

    if (!ownerVM.owner && !checkedOwnerVM.owner)
      return { ...ownerVM, checked: !ownerVM.checked };

    return ownerVM;
  });

  return { ...taskFilterVM, ownerVMs: ownerVMs };
}

export const getUpdateTaskFilterVMByPriority = (taskFilterVM: TaskFilterVM, checkedPriorityVM: TaskFilterPriorityVM): TaskFilterVM => {
  let priorityVMs: TaskFilterPriorityVM[] = taskFilterVM.priorityVMs;
  priorityVMs = priorityVMs.map((priorityVM: TaskFilterPriorityVM) => {
    return priorityVM.value === checkedPriorityVM.value ? { ...priorityVM, checked: !priorityVM.checked } : priorityVM;
  });

  return { ...taskFilterVM, priorityVMs: priorityVMs };
}

export const getUpdateTaskFilterVMByCategory = (taskFilterVM: TaskFilterVM, checkedCategoryVM: TaskFilterCategoryVM): TaskFilterVM => {
  let categoryVMs: TaskFilterCategoryVM[] = taskFilterVM.categoryVMs;
  categoryVMs = categoryVMs.map((categoryVM: TaskFilterCategoryVM) => {
    return categoryVM.value === checkedCategoryVM.value ? { ...categoryVM, checked: !categoryVM.checked } : categoryVM;
  });

  switch (checkedCategoryVM.value) {
    case 'hasOwner':
      const ownerVMs: TaskFilterOwnerVM[] = taskFilterVM.ownerVMs.map((ownerVM: TaskFilterOwnerVM) => {
        return { ...ownerVM, checked: false };
      });

      return { ...taskFilterVM, hasOwner: !checkedCategoryVM.checked, ownerVMs: ownerVMs, categoryVMs: categoryVMs }

    case 'hasPriority':
      return { ...taskFilterVM, hasPriority: !checkedCategoryVM.checked, priorityVMs: getDefaultPrioritiesVMs(), categoryVMs: categoryVMs };
    default:
      return { ...taskFilterVM, categoryVMs: categoryVMs };
  }
}

export const getDefaultTaskFilter = (): TaskFilter => {
  return {
    id: undefined,
    projectId: '',
    hasOwner: true,
    hasPriority: true,
  }
}

export const getToAddTaskFilter = (projectId: string): TaskFilter => {
  return {
    id: undefined,
    projectId: projectId,
    hasOwner: true,
    hasPriority: true,
  }
}

export const getToUpdateTaskFilter = (currentTaskFilter: TaskFilter, updatedTaskFilterVM: TaskFilterVM): TaskFilter => {
  return { ...currentTaskFilter, hasOwner: updatedTaskFilterVM.hasOwner, hasPriority: updatedTaskFilterVM.hasPriority };
}

export const getDefaultFilterCategoryVMs = (): TaskFilterCategoryVM[] => {
  return [
    {
      label: '执行者',
      value: 'hasOwner',
      checked: false,
    },
    {
      label: '优先级',
      value: 'hasPriority',
      checked: false,
    }
  ];
}

export const getFilterCategoryVMs = (taskFilter: TaskFilter): TaskFilterCategoryVM[] => {
  let categoryVMs: TaskFilterCategoryVM[] = getDefaultFilterCategoryVMs();
  categoryVMs = categoryVMs.map((categoryVM: TaskFilterCategoryVM) => {
    if ((<any>taskFilter)[categoryVM.value])
      return { ...categoryVM, checked: true };
    return categoryVM;
  });

  return [...categoryVMs];
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
