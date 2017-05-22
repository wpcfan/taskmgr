import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { routerReducer, RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { environment } from '../../environments/environment';
import { Auth } from '../domain';
import * as authActions from "../actions/auth.action";

/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromAuth from './auth.reducer';
import * as fromQuote from './quote.reducer';
import * as fromProjects from './project.reducer';
import * as fromTaskLists from './task-list.reducer';
import * as fromTasks from './task.reducer';
import * as fromUsers from './user.reducer';
import * as fromTaskForm from "./task-form.reducer";

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  auth: Auth;
  quote: fromQuote.State;
  projects: fromProjects.State;
  taskLists: fromTaskLists.State;
  tasks: fromTasks.State;
  users: fromUsers.State;
  taskForm: fromTaskForm.State;
  router: fromRouter.RouterState;
}

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
const reducers = {
  auth: fromAuth.reducer,
  quote: fromQuote.reducer,
  projects: fromProjects.reducer,
  taskLists: fromTaskLists.reducer,
  tasks: fromTasks.reducer,
  users: fromUsers.reducer,
  taskForm: fromTaskForm.reducer,
  router: fromRouter.routerReducer,
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

const initState = {
  auth: fromAuth.initialState,
  quote: fromQuote.initialState,
  projects: fromProjects.initialState,
  taskLists: fromTaskLists.initialState,
  tasks: fromTasks.initialState,
  users: fromUsers.initialState,
  taskForm: fromTaskForm.initialState,
  router: fromRouter.initialState
}

export function reducer(state: any, action: any) {
  if(action.type === authActions.ActionTypes.LOGOUT)
    return initState;
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
export const getTaskFormState = (state: State) => state.taskForm;
export const getRouterState = (state: State) => state.router;

export const getAuth = createSelector(getAuthState, fromAuth.getAuth);
export const getAuthUser = createSelector(getAuthState, fromAuth.getAuthUser);
export const getQuote = createSelector(getQuoteState, fromQuote.getQuote);
export const getProjects = createSelector(getProjectsState, fromProjects.getAll);
export const getProjectEntities = createSelector(getProjectsState, fromProjects.getEntities);
export const getTaskLists = createSelector(getTaskListsState, fromTaskLists.getTaskLists);
export const getTaskListEntities = createSelector(getTaskListsState, fromTaskLists.getEntities);
export const getTaskListIds = createSelector(getTaskListsState, fromTaskLists.getIds);
export const getTaskDrag = createSelector(getTaskListsState, fromTaskLists.getDragTask);
export const getTaskDrop = createSelector(getTaskListsState, fromTaskLists.getDropTask);
export const getSelectedProjectId = createSelector(getProjectsState, fromProjects.getSelectedId);
export const getSelectedProject = createSelector(getProjectEntities, getSelectedProjectId, (entities, id)=>{
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
  })
})

@NgModule({
  imports: [
    /**
     * StoreModule.provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    // Note that you must instrument after importing StoreModule
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  ]
})
export class AppStoreModule {}