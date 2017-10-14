import {TaskVM, TaskListVM, ProjectVM} from '../vm';
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
    ownerId: <string>taskVM!.owner!.id,
    participantIds: <string[]>taskVM!.participants!.map(user => <string>user.id)
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

export const convertToProject = (projectVM: ProjectVM): Project => {
  return {
    id: <string>projectVM.id,
    name: projectVM.name,
    coverImg: projectVM.coverImg,
    desc: projectVM.desc,
    enabled: projectVM.enabled,
    memberIds: <string[]>projectVM!.members!.map((user: User) => <string>user.id),
    taskListIds: <string[]>projectVM!.taskLists!.map((tl: TaskListVM) => <string>tl.id)
  }
}
