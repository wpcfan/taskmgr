import * as authActions from './auth.action';
import * as projectActions from './project.action';
import * as quoteActions from './quote.action';
import * as todoActions from './todo.action';
import * as taskListActions from './task-list.action';

export const ActionTypes = {
  auth: authActions.ActionTypes,
  project: projectActions.ActionTypes,
  quote: quoteActions.ActionTypes,
  todo: todoActions.ActionTypes,
  taskList: taskListActions.ActionTypes
}
