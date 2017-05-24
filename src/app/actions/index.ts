import * as authActions from './auth.action';
import * as projectActions from './project.action';
import * as quoteActions from './quote.action';
import * as taskListActions from './task-list.action';
import * as taskActions from './task.action';
import * as userActions from './user.action';
import * as themeActions from './theme.action';

export const ActionTypes = {
  auth: authActions.ActionTypes,
  project: projectActions.ActionTypes,
  quote: quoteActions.ActionTypes,
  taskList: taskListActions.ActionTypes,
  task: taskActions.ActionTypes,
  user: userActions.ActionTypes,
  theme: themeActions.ActionTypes,
};
