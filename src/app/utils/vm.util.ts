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
    ownerId: taskVM.owner.id,
    participantIds: taskVM.participants.map(user => user.id)
  }
};

export const converToTaskList = (taskListVM: TaskListVM): TaskList => {
  return {
    id: taskListVM.id,
    name: taskListVM.name,
    order: taskListVM.order,
    projectId: taskListVM.projectId,
    taskIds: taskListVM.tasks.map(task => task.id)
  }
};

export const convertToProject = (projectVM: ProjectVM): Project => {
  return {
    id: projectVM.id,
    name: projectVM.name,
    coverImg: projectVM.coverImg,
    desc: projectVM.desc,
    enabled: projectVM.enabled,
    members: projectVM.members.map((user: User) => <string>user.id),
    taskLists: projectVM.taskLists.map((tl: TaskList) => <string>tl.id)
  }
}
