import {TaskVM, TaskListVM} from '../vm';
import {Task, TaskList, Project, User} from '../domain';

export const covertToTask = (taskVM: TaskVM): Task => {
  return {
    id: taskVM.id,
    desc: taskVM.desc,
    completed: taskVM.completed,
    priority: taskVM.priority,
    taskListId: taskVM.taskListId,
    dueDate: taskVM.dueDate,
    createDate: taskVM.createDate,
    reminder: taskVM.reminder,
    remark: taskVM.remark,
    ownerId: <string>taskVM!.owner!.username,
    participantIds: <string[]>taskVM!.participants!.map(user => <string>user.username)
  }
};

export const converToTaskList = (taskListVM: TaskListVM): TaskList => {
  return {
    id: <string>taskListVM.id,
    name: taskListVM.name,
    order: taskListVM.order,
    projectId: <string>taskListVM.projectId,
    taskIds: taskListVM.tasks.map((task: TaskVM) => <string>task.id)
  }
};
