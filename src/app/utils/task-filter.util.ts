import {
  TaskFilterVM,
  TaskFilterItemVM,
  TaskFilterPriorityVM,
  TaskFilterOwnerVM,
  TaskVM
} from '../vm';
import { User, TaskFilter } from '../domain';
import * as DateFns from 'date-fns';

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

    /** DueDate */
    if (filterVM.hasDueDate) {
      const dueDateVMCheckeds: TaskFilterItemVM[] = filterVM.dueDateVMs.filter((dueDateVM: TaskFilterItemVM) => dueDateVM.checked);
      if (dueDateVMCheckeds.length > 0) {
        const matchedDueDateVMs: TaskFilterItemVM[] = dueDateVMCheckeds.filter((dueDateVM: TaskFilterItemVM) => {
          switch (dueDateVM.value) {
            case 'today':
              if (!task.dueDate)
                return false;

              return DateFns.format(new Date(), 'YYYY-MM-DD') === DateFns.format(task.dueDate, 'YYYY-MM-DD') ? true : false;
            case 'overdue': {
              if (!task.dueDate)
                return false;

              const nowDate: Date = new Date();
              const todayDate: Date = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());

              if (todayDate.getTime() > new Date(task.dueDate).getTime())
                return true;

              return false;
            }
            case 'undone':
              return !task.completed;
            case 'done':
              return task.completed;
            default:
              return true;
          }
        });

        if (matchedDueDateVMs.length === 0)
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

export const getUpdateTaskFilterVMByDueDate = (taskFilterVM: TaskFilterVM, checkedDueDateVM: TaskFilterItemVM): TaskFilterVM => {
  let dueDateVMs: TaskFilterItemVM[] = taskFilterVM.dueDateVMs;
  dueDateVMs = dueDateVMs.map((dueDateVM: TaskFilterItemVM) => {
    return dueDateVM.value === checkedDueDateVM.value ? { ...dueDateVM, checked: !dueDateVM.checked } : dueDateVM;
  });
  return { ...taskFilterVM, dueDateVMs: dueDateVMs };
}

export const getUpdateTaskFilterVMByPriority = (taskFilterVM: TaskFilterVM, checkedPriorityVM: TaskFilterPriorityVM): TaskFilterVM => {
  let priorityVMs: TaskFilterPriorityVM[] = taskFilterVM.priorityVMs;
  priorityVMs = priorityVMs.map((priorityVM: TaskFilterPriorityVM) => {
    return priorityVM.value === checkedPriorityVM.value ? { ...priorityVM, checked: !priorityVM.checked } : priorityVM;
  });

  return { ...taskFilterVM, priorityVMs: priorityVMs };
}

export const getUpdateTaskFilterVMByCategory = (taskFilterVM: TaskFilterVM, checkedCategoryVM: TaskFilterItemVM): TaskFilterVM => {
  let categoryVMs: TaskFilterItemVM[] = taskFilterVM.categoryVMs;
  categoryVMs = categoryVMs.map((categoryVM: TaskFilterItemVM) => {
    return categoryVM.value === checkedCategoryVM.value ? { ...categoryVM, checked: !categoryVM.checked } : categoryVM;
  });

  switch (checkedCategoryVM.value) {
    case 'hasOwner':
      const ownerVMs: TaskFilterOwnerVM[] = taskFilterVM.ownerVMs.map((ownerVM: TaskFilterOwnerVM) => {
        return { ...ownerVM, checked: false };
      });

      return {
        ...taskFilterVM,
        hasOwner: !checkedCategoryVM.checked,
        ownerVMs: ownerVMs,
        categoryVMs: categoryVMs
      };
    case 'hasDueDate':
      return {
        ...taskFilterVM,
        hasDueDate: !checkedCategoryVM.checked,
        dueDateVMs: getDefaultDueDateVMs(),
        categoryVMs: categoryVMs
      }
    case 'hasPriority':
      return {
        ...taskFilterVM,
        hasPriority: !checkedCategoryVM.checked,
        priorityVMs: getDefaultPrioritiesVMs(),
        categoryVMs: categoryVMs
      };
    default:
      return { ...taskFilterVM, categoryVMs: categoryVMs };
  }
}

export const getDefaultTaskFilter = (): TaskFilter => {
  return {
    id: undefined,
    projectId: '',
    hasOwner: true,
    hasDueDate: true,
    hasPriority: false,
  }
}

export const getToAddTaskFilter = (projectId: string): TaskFilter => {
  return {
    id: undefined,
    projectId: projectId,
    hasOwner: true,
    hasDueDate: true,
    hasPriority: false,
  }
}

export const getToUpdateTaskFilter = (currentTaskFilter: TaskFilter, updatedTaskFilterVM: TaskFilterVM): TaskFilter => {
  return {
    ...currentTaskFilter,
    hasOwner: updatedTaskFilterVM.hasOwner,
    hasDueDate: updatedTaskFilterVM.hasDueDate,
    hasPriority: updatedTaskFilterVM.hasPriority
  };
}

export const getDefaultTaskFilterVM = (): TaskFilterVM => {
  return {
    id: undefined,
    projectId: '',
    hasOwner: true,
    hasDueDate: true,
    hasPriority: false,
    ownerVMs: getDefaultOwnerVMs(),
    dueDateVMs: getDefaultDueDateVMs(),
    priorityVMs: getDefaultPrioritiesVMs(),
    categoryVMs: getDefaultFilterCategoryVMs(),
  }
}

export const getTaskFilterVM = (taskFilter: TaskFilter): TaskFilterVM => {
  return {
    ...taskFilter,
    ownerVMs: getDefaultOwnerVMs(),
    dueDateVMs: getDefaultDueDateVMs(),
    priorityVMs: getDefaultPrioritiesVMs(),
    categoryVMs: getFilterCategoryVMs(taskFilter)
  };
}

export const getDefaultFilterCategoryVMs = (): TaskFilterItemVM[] => {
  return [
    {
      label: '执行者',
      value: 'hasOwner',
      checked: false,
    },
    {
      label: '截止时间',
      value: 'hasDueDate',
      checked: false,
    },
    {
      label: '优先级',
      value: 'hasPriority',
      checked: false,
    }
  ];
}

export const getFilterCategoryVMs = (taskFilter: TaskFilter): TaskFilterItemVM[] => {
  let categoryVMs: TaskFilterItemVM[] = getDefaultFilterCategoryVMs();
  categoryVMs = categoryVMs.map((categoryVM: TaskFilterItemVM) => {
    if ((<any>taskFilter)[categoryVM.value])
      return { ...categoryVM, checked: true };
    return categoryVM;
  });

  return [...categoryVMs];
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

export const getDefaultDueDateVMs = (): TaskFilterItemVM[] => {
  return [
    {
      label: '今天截止',
      value: 'today',
      checked: false,
    },
    {
      label: '已逾期',
      value: 'overdue',
      checked: false,
    },
    {
      label: '未完成',
      value: 'undone',
      checked: false,
    },
    {
      label: '已完成',
      value: 'done',
      checked: false,
    }
  ];
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
