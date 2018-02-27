import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UserService } from '../services';
import { Project } from '../domain';
import * as actions from '../actions/user.action';
import * as prjActions from '../actions/project.action';

@Injectable()
export class UserEffects {
  /**
   *
   */
  @Effect()
  searchUsers$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.SearchUsersAction>(actions.SEARCH_USERS),
      map(action => action.payload),
      switchMap((str) => this.service$.searchUsers(str)
        .pipe(
          map(users => new actions.SearchUsersSuccessAction(users)),
          catchError(err => of(new actions.SearchUsersFailAction(JSON.stringify(err))))
        )
      )
    );

  @Effect()
  addUserProject$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.AddUserProjectAction>(actions.ADD_USER_PROJECT),
      map(action => action.payload),
      switchMap(({ user, projectId }) => {
        return this.service$.addProjectRef(user, projectId)
          .pipe(
            map(u => new actions.AddUserProjectSuccessAction(u)),
            catchError(err => of(new actions.AddUserProjectFailAction(JSON.stringify(err))))
          );
      }
      )
    );


  @Effect()
  removeUserProject$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.RemoveUserProjectAction>(actions.REMOVE_USER_PROJECT),
      map(action => action.payload),
      switchMap(({ user, projectId }) => {
        return this.service$.removeProjectRef(user, projectId)
          .pipe(
            map(u => new actions.RemoveUserProjectSuccessAction(u)),
            catchError(err => of(new actions.RemoveUserProjectFailAction(JSON.stringify(err))))
          );
      }
      )
    );

  @Effect()
  toLoadUser$: Observable<Action> = this.actions$
    .pipe(
      ofType<prjActions.LoadProjectsSuccessAction>(prjActions.LOADS_SUCCESS),
      map(action => action.payload),
      switchMap((prjs: Project[]) => from(prjs.map(prj => prj.id))),
      map((projectId: string) => new actions.LoadUsersByPrjAction(projectId))
    );

  @Effect()
  loadProjectUsers$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.LoadUsersByPrjAction>(actions.LOAD_USERS_BY_PRJ),
      map(action => action.payload),
      switchMap(projectId =>
        this.service$.getUsersByProject(projectId)
          .pipe(
            map(users => new actions.LoadUsersByPrjSuccessAction(users)),
            catchError(err => of(new actions.LoadUsersByPrjFailAction(JSON.stringify(err))))
          )
      )
    );

  @Effect()
  batchUpdateProjectUsers$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.BatchUpdateUserProjectAction>(actions.BATCH_UPDATE_USER_PROJECT),
      map(action => action.payload),
      switchMap(project =>
        this.service$.batchUpdateProjectRef(project)
          .pipe(
            map(users => new actions.BatchUpdateUserProjectSuccessAction(users)),
            catchError(err => of(new actions.BatchUpdateUserProjectFailAction(err)))
          )
      )
    );


  /**
   * 任务的 Effects
   * @param actions$ 注入 action 数据流
   * @param service$ 注入任务服务
   */
  constructor(private actions$: Actions,
    private service$: UserService) {
  }
}
