import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import {
  withLatestFrom,
  switchMap,
  map,
  catchError,
  tap
} from 'rxjs/operators';
import { ProjectService } from '../services';
import { Project, User } from '../domain';
import * as routerActions from '../actions/router.action';
import * as actions from '../actions/project.action';
import * as tasklistActions from '../actions/task-list.action';
import * as taskFilterActions from '../actions/task-filter.action';
import * as userActions from '../actions/user.action';
import * as fromRoot from '../reducers';

@Injectable()
export class ProjectEffects {
  /**
   *
   */
  @Effect()
  loadProjects$: Observable<Action> = this.actions$.pipe(
    ofType<actions.LoadProjectsAction>(actions.LOADS),
    withLatestFrom(this.store$.pipe(select(fromRoot.getAuth))),
    switchMap(([_, auth]) =>
      this.service.get(<string>auth.user.id).pipe(
        map(projects => new actions.LoadProjectsSuccessAction(projects)),
        catchError(err =>
          of(new actions.LoadProjectsFailAction(JSON.stringify(err)))
        )
      )
    )
  );

  @Effect()
  addProject$: Observable<Action> = this.actions$.pipe(
    ofType<actions.AddProjectAction>(actions.ADD),
    map(action => action.payload),
    withLatestFrom(this.store$.pipe(select(fromRoot.getAuth))),
    switchMap(([project, auth]) => {
      const added = { ...project, members: [`${auth.user.id}`] };
      return this.service.add(added).pipe(
        map(returned => new actions.AddProjectSuccessAction(returned)),
        catchError(err =>
          of(new actions.AddProjectFailAction(JSON.stringify(err)))
        )
      );
    })
  );

  @Effect()
  updateProject$: Observable<Action> = this.actions$.pipe(
    ofType<actions.UpdateProjectAction>(actions.UPDATE),
    map(action => action.payload),
    switchMap(project =>
      this.service.update(project).pipe(
        map(returned => new actions.UpdateProjectSuccessAction(returned)),
        catchError(err =>
          of(new actions.UpdateProjectFailAction(JSON.stringify(err)))
        )
      )
    )
  );

  @Effect()
  updateLists$: Observable<Action> = this.actions$.pipe(
    ofType<actions.UpdateListsAction>(actions.UPDATE_LISTS),
    map(action => action.payload),
    switchMap(project =>
      this.service.updateTaskLists(project).pipe(
        map(returned => new actions.UpdateListsSuccessAction(returned)),
        catchError(err =>
          of(new actions.UpdateListsFailAction(JSON.stringify(err)))
        )
      )
    )
  );

  @Effect()
  addTaskFilterId$: Observable<Action> = this.actions$.pipe(
    ofType<actions.InsertFilterAction>(actions.INSERT_FILTER),
    map(action => action.payload),
    switchMap(project =>
      this.service.insertTaskFilter(project).pipe(
        map(p => new actions.InsertFilterSuccessAction(p)),
        catchError(err =>
          of(new actions.InsertFilterFailAction(JSON.stringify(err)))
        )
      )
    )
  );

  @Effect()
  removeProject$: Observable<Action> = this.actions$.pipe(
    ofType<actions.DeleteProjectAction>(actions.DELETE),
    map(action => action.payload),
    switchMap(project =>
      this.service.del(project).pipe(
        map(returned => new actions.DeleteProjectSuccessAction(returned)),
        catchError(err =>
          of(new actions.DeleteProjectFailAction(JSON.stringify(err)))
        )
      )
    )
  );

  @Effect()
  selectProject$: Observable<Action> = this.actions$.pipe(
    ofType<actions.SelectProjectAction>(actions.SELECT),
    map(action => action.payload),
    map(project => new routerActions.Go({ path: [`/tasklists/${project.id}`] }))
  );

  @Effect()
  loadTaskLists$: Observable<Action> = this.actions$.pipe(
    ofType<actions.SelectProjectAction>(actions.SELECT),
    map(action => action.payload),
    map(project => new tasklistActions.LoadTaskListsAction(<string>project.id))
  );

  @Effect()
  loadTaskFilter$: Observable<Action> = this.actions$.pipe(
    ofType<actions.SelectProjectAction>(actions.SELECT),
    map(action => action.payload),
    map(
      project =>
        new taskFilterActions.LoadTaskFilterAction(<string>project.taskFilterId)
    )
  );

  @Effect()
  toLoadUsersByPrj$: Observable<Action> = this.actions$.pipe(
    ofType<actions.SelectProjectAction>(actions.SELECT),
    map(action => action.payload),
    map(project => new userActions.LoadUsersByPrjAction(<string>project.id))
  );

  @Effect()
  startInitTaskLists$: Observable<Action> = this.actions$.pipe(
    ofType<actions.AddProjectSuccessAction>(actions.ADD_SUCCESS),
    map(action => action.payload),
    map(project => new tasklistActions.InitTaskListsAction(project))
  );

  @Effect()
  addTaskFilter$: Observable<Action> = this.actions$.pipe(
    ofType<actions.AddProjectSuccessAction>(actions.ADD_SUCCESS),
    map(action => action.payload),
    map(project => new taskFilterActions.AddTaskFilterAction(project))
  );

  @Effect()
  addUserPrjRef$: Observable<Action> = this.actions$.pipe(
    ofType<actions.AddProjectSuccessAction>(actions.ADD_SUCCESS),
    map(action => action.payload),
    map((prj: Project) => prj.id),
    withLatestFrom(
      this.store$.pipe(
        select(fromRoot.getAuth),
        map(auth => auth.user)
      ),
      (projectId: string, user: User) => {
        return new userActions.AddUserProjectAction({
          user: user,
          projectId: projectId
        });
      }
    )
  );

  @Effect()
  delUserPrjRef$: Observable<Action> = this.actions$.pipe(
    ofType<actions.DeleteProjectSuccessAction>(actions.DELETE_SUCCESS),
    map(action => action.payload),
    map((prj: Project) => prj.id),
    withLatestFrom(
      this.store$.pipe(
        select(fromRoot.getAuth),
        map(auth => auth.user)
      ),
      (projectId: string, user: User) => {
        return new userActions.RemoveUserProjectAction({
          user: user,
          projectId: projectId
        });
      }
    )
  );

  @Effect()
  inviteMembersRef$: Observable<Action> = this.actions$.pipe(
    ofType<actions.InviteMembersAction>(actions.INVITE),
    map(action => action.payload),
    switchMap(({ projectId, members }) =>
      this.service.inviteMembers(projectId, members).pipe(
        map(
          (project: Project) => new actions.InviteMembersSuccessAction(project)
        ),
        catchError(err => of(new actions.InviteMembersFailAction(err)))
      )
    )
  );

  @Effect()
  updateUserPrjRef$: Observable<Action> = this.actions$.pipe(
    ofType<actions.InviteMembersSuccessAction>(actions.INVITE_SUCCESS),
    map(action => action.payload),
    map(
      (project: Project) =>
        new userActions.BatchUpdateUserProjectAction(project)
    )
  );

  @Effect({ dispatch: false })
  navigate$ = this.actions$.pipe(
    ofType(routerActions.GO),
    map((action: routerActions.Go) => action.payload),
    tap(({ path, query: queryParams, extras }) =>
      this.router.navigate(path, { queryParams, ...extras })
    )
  );

  /**
   *
   * @param actions$ action 流
   * @param service  注入 ProjectService
   * @param store$ 注入 redux store
   */
  constructor(
    private actions$: Actions,
    private service: ProjectService,
    private router: Router,
    private store$: Store<fromRoot.State>
  ) {}
}
