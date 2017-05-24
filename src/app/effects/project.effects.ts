import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/debounceTime';
import { ProjectService } from '../services';
import * as actions from '../actions/project.action';
import * as tasklistActions from '../actions/task-list.action';
import * as userActions from '../actions/user.action';
import * as fromRoot from '../reducers';
import { Project, TaskList } from '../domain';

@Injectable()
export class ProjectEffects{
  /**
   *
   * @param actions$
   * @param todoService
   */
  constructor(
    private actions$: Actions,
    private service: ProjectService,
    private store$: Store<fromRoot.State>) { }
  /**
   *
   */
  @Effect()
  loadProjects$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOADS)
    .map(toPayload)
    .withLatestFrom(this.store$.select(fromRoot.getAuth))
    .switchMap(([_, auth]) => this.service
      .get(auth.user.id)
      .map(projects => new actions.LoadProjectsSuccessAction(projects))
      .catch(err => of(new actions.LoadProjectsFailAction(JSON.stringify(err))))
    );

  @Effect()
  addProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ADD)
    .map(toPayload)
    .withLatestFrom(this.store$.select(fromRoot.getAuth))
    .switchMap(([project, auth]) => {
      const added = Object.assign({}, project, {members: [`${auth.user.id}`]});
      return this.service
        .add(added)
        .map(project => new actions.AddProjectSuccessAction(project))
        .catch(err => of(new actions.AddProjectFailAction(JSON.stringify(err))))
      }
    );

  @Effect()
  updateProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.UPDATE)
    .map(toPayload)
    .switchMap(project => this.service
      .update(project)
      .map(project => new actions.UpdateProjectSuccessAction(project))
      .catch(err => of(new actions.UpdateProjectFailAction(JSON.stringify(err))))
    );

  @Effect()
  removeProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.DELETE)
    .map(toPayload)
    .switchMap(project => this.service
      .del(project)
      .map(project => new actions.DeleteProjectSuccessAction(project))
      .catch(err => of(new actions.DeleteProjectFailAction(JSON.stringify(err))))
    );

  @Effect()
  afterRemoveProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.DELETE_SUCCESS)
    .map(toPayload)
    .switchMap(project => this.store$
      .select(fromRoot.getProjectTaskList)
      .switchMap(lists => Observable.from(lists))
      .map((taskList: TaskList) => new tasklistActions.DeleteTaskListAction(taskList))
      );

  @Effect()
  selectProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.SELECT)
    .map(toPayload)
    .map(project => go([`/tasklists/${project.id}`]));

  @Effect()
  loadTaskLists$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.SELECT)
    .map(toPayload)
    .map(project => new tasklistActions.LoadTaskListsAction(project.id));

  @Effect()
  toLoadUsersByPrj$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.SELECT)
    .map(toPayload)
    .map(project => new userActions.LoadUsersByPrjAction(project.id));

  @Effect()
  startInitTaskLists$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ADD_SUCCESS)
    .map(toPayload)
    .map(project => new tasklistActions.InitTaskListsAction(project));

  @Effect()
  addUserPrjRef$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ADD_SUCCESS)
    .map(toPayload)
    .map((prj: Project) => prj.id)
    .withLatestFrom(this.store$.select(fromRoot.getAuth).map(auth => auth.user), (projectId, user) => {
      return new userActions.AddUserProjectAction({user: user, projectId: projectId})
    });

  @Effect()
  delUserPrjRef$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.DELETE_SUCCESS)
    .map(toPayload)
    .map((prj: Project) => prj.id)
    .withLatestFrom(this.store$.select(fromRoot.getAuth).map(auth => auth.user), (projectId, user) => {
      return new userActions.RemoveUserProjectAction({user: user, projectId: projectId})
    });
}
