import {NgModule} from '@angular/core';
/**
 * combineReducers 接收一系列的 reducer 作为参数，然后创建一个新的 reducer
 * 这个新的 reducer 接收到各 reducer 的值后，按 reducer 的 key 进行存储。
 * 把这个新的 reducer 想象成一个数据库，各个子 reducer 就像数据库中的表。
 *
 */
import {ActionReducer, combineReducers, StoreModule} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import {RouterStoreModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {createSelector} from 'reselect';
import {environment} from '../../environments/environment';
import {Auth} from '../domain';
import * as authActions from '../actions/auth.action';
/**
 * compose 函数是一个很方便的工具，简单来说，它接受任意数量的函数作为参数，然后返回一个新的函数。
 * 这个新的函数其实就是前面的函数的叠加，比如说，我们给出 `compose(f(x), g(x))`, 返回的新函数
 * 就是 `g(f(x))`。
 */
import {compose} from '@ngrx/core/compose';
/**
 * storeFreeze 用于防止 state 被修改，在 Redux 中我们必须确保 state 是不可更改的，这个函数
 * 有助于帮我们检测 state 是否被有意或无意的修改了。当 state 发生修改时，会抛出一个异常，这一点
 * 在开发时非常有帮助。根据环境变量的值，发布时会不包含这个函数。
 */
import {storeFreeze} from 'ngrx-store-freeze';
/**
 * 分别从每个 reducer 中将需要导出的函数或对象进行导出，并起个易懂的名字
 */
import * as fromAuth from './auth.reducer';
import * as fromQuote from './quote.reducer';
import * as fromProjects from './project.reducer';
import * as fromTaskLists from './task-list.reducer';
import * as fromTasks from './task.reducer';
import * as fromUsers from './user.reducer';
import * as fromTheme from './theme.reducer';

/**
 * 正如我们的 reducer 像数据库中的表一样，我们的顶层 state 也包含各个子 reducer 的 state
 * 并且使用一个 key 来标识各个子 state
 */
export interface State {
  auth: Auth;
  quote: fromQuote.State;
  projects: fromProjects.State;
  taskLists: fromTaskLists.State;
  tasks: fromTasks.State;
  users: fromUsers.State;
  theme: fromTheme.State;
  router: fromRouter.RouterState;
}

const reducers = {
  auth: fromAuth.reducer,
  quote: fromQuote.reducer,
  projects: fromProjects.reducer,
  taskLists: fromTaskLists.reducer,
  tasks: fromTasks.reducer,
  users: fromUsers.reducer,
  theme: fromTheme.reducer,
  router: fromRouter.routerReducer,
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
/**
 * 使用 combineReducers 把所有子 reducer 合并产生一个顶级 reducer
 */
const productionReducer: ActionReducer<State> = combineReducers(reducers);

const initState = {
  auth: fromAuth.initialState,
  quote: fromQuote.initialState,
  projects: fromProjects.initialState,
  taskLists: fromTaskLists.initialState,
  tasks: fromTasks.initialState,
  users: fromUsers.initialState,
  theme: fromTheme.initialState,
  router: fromRouter.initialState
};

export function reducer(state: any, action: any) {
  if (action.type === authActions.ActionTypes.LOGOUT) {
    return initState;
  }
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

export const getAuthState = (state: State) => state.auth;
export const getQuoteState = (state: State) => state.quote;
export const getProjectsState = (state: State) => state.projects;
export const getTaskListsState = (state: State) => state.taskLists;
export const getTasksState = (state: State) => state.tasks;
export const getUserState = (state: State) => state.users;
export const getRouterState = (state: State) => state.router;
export const getThemeState = (state: State) => state.theme;

export const getAuth = createSelector(getAuthState, fromAuth.getAuth);
export const getAuthUser = createSelector(getAuthState, fromAuth.getAuthUser);
export const getQuote = createSelector(getQuoteState, fromQuote.getQuote);
export const getProjects = createSelector(getProjectsState, fromProjects.getAll);
export const getProjectEntities = createSelector(getProjectsState, fromProjects.getEntities);
export const getTaskLists = createSelector(getTaskListsState, fromTaskLists.getTaskLists);
export const getTaskListEntities = createSelector(getTaskListsState, fromTaskLists.getEntities);
export const getTaskListIds = createSelector(getTaskListsState, fromTaskLists.getIds);
export const getSelectedProjectId = createSelector(getProjectsState, fromProjects.getSelectedId);
export const getSelectedProject = createSelector(getProjectEntities, getSelectedProjectId, (entities, id) => {
  return entities[id];
});
export const getProjectTaskList = createSelector(getSelectedProjectId, getTaskLists, (projectId, taskLists) => {
  return taskLists.filter(taskList => taskList.projectId === projectId);
});
export const getTasks = createSelector(getTasksState, fromTasks.getTasks);
export const getTaskEntities = createSelector(getTasksState, fromTasks.getEntities);
export const getTaskIds = createSelector(getTasksState, fromTasks.getIds);
export const getTaskLoading = createSelector(getTasksState, fromTasks.getLoading);
export const getUsers = createSelector(getUserState, fromUsers.getUsers);
export const getUserIds = createSelector(getUserState, fromUsers.getIds);
export const getUserEntities = createSelector(getUserState, fromUsers.getEntities);
export const getTasksWithOwner = createSelector(getTasks, getUserEntities, (tasks, entities) => {
  return tasks.map(task => {
    const owner = entities[task.ownerId];
    const participants = task.participantIds.map(id => entities[id]);
    return Object.assign({}, task, {owner: owner}, {participants: [...participants]});
  });
});
export const getProjectMembers = (projectId: string) => createSelector(getProjectsState, getUserEntities, (state, entities) => {
  return state.entities[projectId].members.map(id => entities[id]);
})
export const getTheme = createSelector(getThemeState, fromTheme.getTheme);

@NgModule({
  imports: [
    /**
     * StoreModule.provideStore  仅需引入一次，请把它包含在根模块或者 CoreModule 中
     * 我们这里为了方便组织，新建了一个 AppStoreModule，但也是只在 CoreModule 中引入的
     */
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    // Note that you must instrument after importing StoreModule
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  ]
})
export class AppStoreModule {
}
