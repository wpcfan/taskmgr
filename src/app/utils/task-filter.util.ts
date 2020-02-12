import {
  TaskFilterVM,
  TaskFilterItemVM,
  TaskFilterPriorityVM,
  TaskFilterOwnerVM,
  TaskFilterCustomDate,
  TaskVM
} from '../vm';
import { User, TaskFilter } from '../domain';
import * as DateFns from 'date-fns';

export const getDefaultDueDateVMs = (): TaskFilterItemVM[] => {
  return [
    {
      label: '今天截止',
      value: 'today',
      checked: false
    },
    {
      label: '已逾期',
      value: 'overdue',
      checked: false
    },
    {
      label: '未完成',
      value: 'undone',
      checked: false
    },
    {
      label: '已完成',
      value: 'done',
      checked: false
    }
  ];
};

export const getDefaultCreateDateVMs = (): TaskFilterItemVM[] => {
  return [
    {
      label: '今天',
      value: 'today',
      checked: false
    },
    {
      label: '昨天',
      value: 'yesterday',
      checked: false
    },
    {
      label: '过去一周',
      value: 'pastWeek',
      checked: false
    },
    {
      label: '过去一月',
      value: 'pastMonth',
      checked: false
    },
    {
      label: '自定义',
      value: 'custom',
      checked: false,
      hasExtra: true
    }
  ];
};

export const getDefaultFilterSortVMs = (): TaskFilterItemVM[] => {
  return [
    {
      label: '项目自定义排序',
      value: 'default',
      checked: false
    },
    {
      label: '按照优先级最高',
      value: 'priorityDesc',
      checked: false
    },
    {
      label: '按截止时间最近',
      value: 'dueDateDesc',
      checked: false
    },
    {
      label: '按创建时间最早',
      value: 'createDateAsc',
      checked: false
    },
    {
      label: '按创建时间最晚',
      value: 'createDateDesc',
      checked: false
    }
  ];
};

export const getTasksByFilterVM = (
  tasks: TaskVM[],
  filterVM: TaskFilterVM
): TaskVM[] => {
  const newTasks: TaskVM[] = tasks.filter((task: TaskVM) => {
    /** Desc */
    if (filterVM.desc) {
      if (task.desc.indexOf(filterVM.desc) === -1) {
        return false;
      }
    }

    /** Owner */
    if (filterVM.hasOwner) {
      const ownerVMCheckeds: TaskFilterOwnerVM[] = filterVM.ownerVMs.filter(
        (ownerVM: TaskFilterOwnerVM) => ownerVM.checked
      );
      if (ownerVMCheckeds.length > 0) {
        const matchedOwnerVMs: TaskFilterOwnerVM[] = ownerVMCheckeds.filter(
          (ownerVM: TaskFilterOwnerVM) => {
            if (ownerVM.owner && task.owner) {
              if (ownerVM.owner.id === task.owner.id) {
                return true;
              }
            }

            if (!ownerVM.owner && !task.owner) {
              return true;
            }

            return false;
          }
        );

        if (matchedOwnerVMs.length === 0) {
          return false;
        }
      }
    }

    /** DueDate */
    if (filterVM.hasDueDate) {
      const dueDateVMCheckeds: TaskFilterItemVM[] = filterVM.dueDateVMs.filter(
        (dueDateVM: TaskFilterItemVM) => dueDateVM.checked
      );
      if (dueDateVMCheckeds.length > 0) {
        const matchedDueDateVMs: TaskFilterItemVM[] = dueDateVMCheckeds.filter(
          (dueDateVM: TaskFilterItemVM) => {
            switch (dueDateVM.value) {
              case 'today':
                if (!task.dueDate) {
                  return false;
                }

                return (
                  DateFns.format(new Date(), 'yyyy-MM-dd') ===
                  DateFns.format(task.dueDate, 'yyyy-MM-dd')
                );
              case 'overdue': {
                if (!task.dueDate) {
                  return false;
                }

                const nowDate: Date = new Date();
                const todayDate: Date = new Date(
                  nowDate.getFullYear(),
                  nowDate.getMonth(),
                  nowDate.getDate()
                );

                return todayDate.getTime() > new Date(task.dueDate).getTime();
              }
              case 'undone':
                return !task.completed;
              case 'done':
                return task.completed;
              default:
                return true;
            }
          }
        );

        if (matchedDueDateVMs.length === 0) {
          return false;
        }
      }
    }

    /** CreateDate */
    if (filterVM.hasCreateDate) {
      const createDateVMCheckeds = filterVM.createDateVMs.filter(
        (createDateVM: TaskFilterItemVM) => createDateVM.checked
      );
      if (createDateVMCheckeds.length > 0) {
        const matchedCreateDateVMs: TaskFilterItemVM[] = createDateVMCheckeds.filter(
          (createDateVM: TaskFilterItemVM) => {
            const createDate: Date = new Date(<Date>task.createDate);
            const createTimestamp: number = createDate.getTime();

            const nowDate: Date = new Date();
            const todayDate: Date = new Date(
              nowDate.getFullYear(),
              nowDate.getMonth(),
              nowDate.getDate()
            );
            const yesterdayDate: Date = new Date(
              todayDate.getTime() - 24 * 60 * 60 * 1000
            );
            const pastWeekDate: Date = new Date(
              todayDate.getTime() - 7 * 24 * 60 * 60 * 1000
            );
            const pastMonthDate: Date = new Date(
              nowDate.getFullYear(),
              nowDate.getMonth() - 1,
              nowDate.getDate()
            );

            const createZeroTimestamp: number = new Date(
              createDate.getFullYear(),
              createDate.getMonth(),
              createDate.getDate()
            ).getTime();
            const customStartTimestamp: number = filterVM.customCreateDate.startDate.getTime();
            const customEndTimestamp: number = filterVM.customCreateDate.endDate.getTime();

            switch (createDateVM.value) {
              case 'today':
                return (
                  DateFns.format(new Date(), 'yyyy-MM-dd') ===
                  DateFns.format(createDate, 'yyyy-MM-dd')
                );
              case 'yesterday':
                return (
                  DateFns.format(yesterdayDate, 'yyyy-MM-dd') ===
                  DateFns.format(createDate, 'yyyy-MM-dd')
                );
              case 'pastWeek':
                return createTimestamp >= pastWeekDate.getTime();
              case 'pastMonth':
                return createTimestamp >= pastMonthDate.getTime();
              case 'custom':
                return (
                  createZeroTimestamp >= customStartTimestamp &&
                  createZeroTimestamp <= customEndTimestamp
                );
              default:
                return true;
            }
          }
        );

        if (matchedCreateDateVMs.length === 0) {
          return false;
        }
      }
    }

    /** Priority */
    if (filterVM.hasPriority) {
      const priorityVMCheckeds = filterVM.priorityVMs.filter(
        (priorityVM: TaskFilterPriorityVM) => priorityVM.checked
      );
      if (priorityVMCheckeds.length > 0) {
        if (
          priorityVMCheckeds.filter(
            (priorityVM: TaskFilterPriorityVM) =>
              priorityVM.value === task.priority
          ).length === 0
        ) {
          return false;
        }
      }
    }

    return true;
  });

  /** Sort */
  switch (filterVM.sort) {
    case 'priorityDesc':
      return newTasks.sort(
        (currentTask: TaskVM, nextTask: TaskVM) =>
          currentTask.priority - nextTask.priority
      );
    case 'dueDateDesc':
      return newTasks.sort((currentTask: TaskVM, nextTask: TaskVM) => {
        if (currentTask.dueDate && nextTask.dueDate) {
          const currentTimestamp: number = new Date(
            <Date>currentTask.dueDate
          ).getTime();
          const nextTimestamp: number = new Date(
            <Date>nextTask.dueDate
          ).getTime();
          return nextTimestamp - currentTimestamp;
        }

        if (currentTask.dueDate && !nextTask.dueDate) {
          return -1;
        }

        if (!currentTask.dueDate && nextTask.dueDate) {
          return 1;
        }

        return 0;
      });
    case 'createDateAsc':
      return newTasks.sort((currentTask: TaskVM, nextTask: TaskVM) => {
        const currentTimestamp: number = new Date(
          <Date>currentTask.createDate
        ).getTime();
        const nextTimestamp: number = new Date(
          <Date>nextTask.createDate
        ).getTime();
        return currentTimestamp - nextTimestamp;
      });
    case 'createDateDesc':
      return newTasks.sort((currentTask: TaskVM, nextTask: TaskVM) => {
        const currentTimestamp: number = new Date(
          <Date>currentTask.createDate
        ).getTime();
        const nextTimestamp: number = new Date(
          <Date>nextTask.createDate
        ).getTime();
        return nextTimestamp - currentTimestamp;
      });
    default:
      return newTasks;
  }
};

export const getUpdateTaskFilterVMBySort = (
  taskFilterVM: TaskFilterVM,
  checkedSortVM: TaskFilterItemVM
): TaskFilterVM => {
  let sortVMs: TaskFilterItemVM[] = getDefaultFilterSortVMs();
  let sort = taskFilterVM.sort;
  sortVMs = sortVMs.map((sortVM: TaskFilterItemVM) => {
    if (sortVM.value === checkedSortVM.value) {
      sort = sortVM.value;
      return { ...sortVM, checked: true };
    }
    return sortVM;
  });

  return { ...taskFilterVM, sort: sort, sortVMs: sortVMs };
};

export const getUpdateTaskFilterVMByOwner = (
  taskFilterVM: TaskFilterVM,
  checkedOwnerVM: TaskFilterOwnerVM
): TaskFilterVM => {
  let ownerVMs: TaskFilterOwnerVM[] = taskFilterVM.ownerVMs;
  ownerVMs = ownerVMs.map((ownerVM: TaskFilterOwnerVM) => {
    if (ownerVM.owner && checkedOwnerVM.owner) {
      if (ownerVM.owner.id === checkedOwnerVM.owner.id) {
        return { ...ownerVM, checked: !ownerVM.checked };
      }
    }

    if (!ownerVM.owner && !checkedOwnerVM.owner) {
      return { ...ownerVM, checked: !ownerVM.checked };
    }

    return ownerVM;
  });

  return { ...taskFilterVM, ownerVMs: ownerVMs };
};

export const getUpdateTaskFilterVMByDueDate = (
  taskFilterVM: TaskFilterVM,
  checkedDueDateVM: TaskFilterItemVM
): TaskFilterVM => {
  let dueDateVMs: TaskFilterItemVM[] = taskFilterVM.dueDateVMs;
  dueDateVMs = dueDateVMs.map((dueDateVM: TaskFilterItemVM) => {
    return dueDateVM.value === checkedDueDateVM.value
      ? { ...dueDateVM, checked: !dueDateVM.checked }
      : dueDateVM;
  });
  return { ...taskFilterVM, dueDateVMs: dueDateVMs };
};

export const getUpdateTaskFilterVMByCreateDate = (
  taskFilterVM: TaskFilterVM,
  checkedCreateDateVM: TaskFilterItemVM
): TaskFilterVM => {
  let createDateVMs: TaskFilterItemVM[] = taskFilterVM.createDateVMs;
  createDateVMs = createDateVMs.map((createDateVM: TaskFilterItemVM) => {
    return createDateVM.value === checkedCreateDateVM.value
      ? { ...createDateVM, checked: !createDateVM.checked }
      : createDateVM;
  });
  return { ...taskFilterVM, createDateVMs: createDateVMs };
};

export const getUpdateTaskFilterVMByCustomCreateDate = (
  taskFilterVM: TaskFilterVM,
  date: Date,
  start: boolean
): TaskFilterVM => {
  let customCreateDate: TaskFilterCustomDate = taskFilterVM.customCreateDate;
  customCreateDate = start
    ? { ...customCreateDate, startDate: date }
    : { ...customCreateDate, endDate: date };
  return { ...taskFilterVM, customCreateDate: customCreateDate };
};

export const getUpdateTaskFilterVMByPriority = (
  taskFilterVM: TaskFilterVM,
  checkedPriorityVM: TaskFilterPriorityVM
): TaskFilterVM => {
  let priorityVMs: TaskFilterPriorityVM[] = taskFilterVM.priorityVMs;
  priorityVMs = priorityVMs.map((priorityVM: TaskFilterPriorityVM) => {
    return priorityVM.value === checkedPriorityVM.value
      ? { ...priorityVM, checked: !priorityVM.checked }
      : priorityVM;
  });

  return { ...taskFilterVM, priorityVMs: priorityVMs };
};

export const getDefaultTaskFilter = (): TaskFilter => {
  return {
    id: undefined,
    projectId: '',
    sort: 'default',
    hasOwner: true,
    hasDueDate: true,
    hasCreateDate: false,
    hasPriority: false
  };
};

export const getToAddTaskFilter = (projectId: string): TaskFilter => {
  return {
    id: undefined,
    projectId: projectId,
    sort: 'default',
    hasOwner: true,
    hasDueDate: true,
    hasCreateDate: false,
    hasPriority: false
  };
};

export const getToUpdateTaskFilter = (
  currentTaskFilter: TaskFilter,
  updatedTaskFilterVM: TaskFilterVM
): TaskFilter => {
  return {
    ...currentTaskFilter,
    sort: updatedTaskFilterVM.sort,
    hasOwner: updatedTaskFilterVM.hasOwner,
    hasDueDate: updatedTaskFilterVM.hasDueDate,
    hasCreateDate: updatedTaskFilterVM.hasCreateDate,
    hasPriority: updatedTaskFilterVM.hasPriority
  };
};

export const getSortVMs = (taskFilter: TaskFilter): TaskFilterItemVM[] => {
  let sortVMs: TaskFilterItemVM[] = getDefaultFilterSortVMs();
  if (taskFilter.sort) {
    sortVMs = sortVMs.map((sortVM: TaskFilterItemVM) => {
      return sortVM.value === taskFilter.sort
        ? { ...sortVM, checked: true }
        : sortVM;
    });
  } else {
    sortVMs = sortVMs.map((sortVM: TaskFilterItemVM) => {
      return sortVM.value === 'default' ? { ...sortVM, checked: true } : sortVM;
    });
  }

  return [...sortVMs];
};

export const getSortVMLabel = (taskFilterVM: TaskFilterVM): string => {
  let label = '项目默认排序';
  taskFilterVM.sortVMs.forEach((sortVM: TaskFilterItemVM) => {
    if (sortVM.value === taskFilterVM.sort) {
      label = sortVM.label;
    }
  });

  return label;
};

export const getDefaultCategoryVMs = (): TaskFilterItemVM[] => {
  return [
    {
      label: '执行者',
      value: 'hasOwner',
      checked: false
    },
    {
      label: '截止时间',
      value: 'hasDueDate',
      checked: false
    },
    {
      label: '创建时间',
      value: 'hasCreateDate',
      checked: false
    },
    {
      label: '优先级',
      value: 'hasPriority',
      checked: false
    }
  ];
};

export const getCategoryVMs = (taskFilter: TaskFilter): TaskFilterItemVM[] => {
  let categoryVMs: TaskFilterItemVM[] = getDefaultCategoryVMs();
  categoryVMs = categoryVMs.map((categoryVM: TaskFilterItemVM) => {
    if ((<any>taskFilter)[categoryVM.value]) {
      return { ...categoryVM, checked: true };
    }
    return categoryVM;
  });

  return [...categoryVMs];
};

export const getDefaultOwnerVMs = (): TaskFilterOwnerVM[] => {
  return [{ checked: false }];
};

export const getOwnerVMs = (owners: User[]): TaskFilterOwnerVM[] => {
  const defaultOwnerVMs: TaskFilterOwnerVM[] = getDefaultOwnerVMs();
  const ownerVMs: TaskFilterOwnerVM[] = owners.map((owner: User) => {
    return { owner: owner, checked: false };
  });

  return [...defaultOwnerVMs, ...ownerVMs];
};

export const getOwnerVMName = (ownerVM: TaskFilterOwnerVM): string => {
  return ownerVM.owner ? <string>ownerVM.owner.name : '待认领';
};

export const getOwnerVMAvatar = (ownerVM: TaskFilterOwnerVM): string => {
  return ownerVM.owner ? <string>ownerVM.owner.avatar : 'unassigned';
};

export const getDefaultCustomStartDate = (): Date => {
  const nowDate: Date = new Date();
  const todayDate: Date = new Date(
    nowDate.getFullYear(),
    nowDate.getMonth(),
    nowDate.getDate()
  );
  const pastWeekDate: Date = new Date(
    todayDate.getTime() - 7 * 24 * 60 * 60 * 1000
  );

  return pastWeekDate;
};

export const getDefaultCustomEndDate = (): Date => {
  const nowDate: Date = new Date();
  const todayDate: Date = new Date(
    nowDate.getFullYear(),
    nowDate.getMonth(),
    nowDate.getDate()
  );

  return todayDate;
};

export const getDefaultCustomCreateDate = (): TaskFilterCustomDate => {
  return {
    startDate: getDefaultCustomStartDate(),
    endDate: getDefaultCustomEndDate()
  };
};

export const getCustomDateDesc = (date: Date): string => {
  return DateFns.format(date, 'MM.DD');
};

export const getDefaultPrioritiesVMs = (): TaskFilterPriorityVM[] => {
  return [
    {
      label: '普通',
      value: 3,
      checked: false
    },
    {
      label: '重要',
      value: 2,
      checked: false
    },
    {
      label: '紧急',
      value: 1,
      checked: false
    }
  ];
};

export const getTaskFilterVM = (taskFilter: TaskFilter): TaskFilterVM => {
  return {
    ...taskFilter,
    sort: taskFilter.sort ? taskFilter.sort : 'default',
    customCreateDate: getDefaultCustomCreateDate(),
    sortVMs: getSortVMs(taskFilter),
    ownerVMs: getDefaultOwnerVMs(),
    dueDateVMs: getDefaultDueDateVMs(),
    createDateVMs: getDefaultCreateDateVMs(),
    priorityVMs: getDefaultPrioritiesVMs(),
    categoryVMs: getCategoryVMs(taskFilter)
  };
};

export const getDefaultTaskFilterVM = (): TaskFilterVM => {
  return {
    id: undefined,
    projectId: '',
    sort: 'default',
    hasOwner: true,
    hasDueDate: true,
    hasCreateDate: false,
    hasPriority: false,
    customCreateDate: getDefaultCustomCreateDate(),
    sortVMs: getDefaultFilterSortVMs(),
    ownerVMs: getDefaultOwnerVMs(),
    dueDateVMs: getDefaultDueDateVMs(),
    createDateVMs: getDefaultCreateDateVMs(),
    priorityVMs: getDefaultPrioritiesVMs(),
    categoryVMs: getDefaultCategoryVMs()
  };
};

export const getUpdateTaskFilterVMByCategory = (
  taskFilterVM: TaskFilterVM,
  checkedCategoryVM: TaskFilterItemVM
): TaskFilterVM => {
  let categoryVMs: TaskFilterItemVM[] = taskFilterVM.categoryVMs;
  categoryVMs = categoryVMs.map((categoryVM: TaskFilterItemVM) => {
    return categoryVM.value === checkedCategoryVM.value
      ? { ...categoryVM, checked: !categoryVM.checked }
      : categoryVM;
  });

  switch (checkedCategoryVM.value) {
    case 'hasOwner':
      const ownerVMs: TaskFilterOwnerVM[] = taskFilterVM.ownerVMs.map(
        (ownerVM: TaskFilterOwnerVM) => {
          return { ...ownerVM, checked: false };
        }
      );

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
      };
    case 'hasCreateDate':
      return {
        ...taskFilterVM,
        hasCreateDate: !checkedCategoryVM.checked,
        customCreateDate: getDefaultCustomCreateDate(),
        createDateVMs: getDefaultCreateDateVMs(),
        categoryVMs: categoryVMs
      };
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
};
