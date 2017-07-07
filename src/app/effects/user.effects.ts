import {Injectable} from '@angular/core';
import {Actions, Effect, toPayload} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {UserService} from '../services';
import * as actions from '../actions/user.action';
import * as prjActions from '../actions/project.action';
import * as fromRoot from '../reducers';
import {Project} from '../domain';

@Injectable()
export class UserEffects {
  /**
   *
   */
  @Effect()
  searchUsers$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.SEARCH_USERS)
    .map(toPayload)
    .switchMap((str) => this.service$
      .searchUsers(str)
      .map(users => new actions.SearchUsersSuccessAction(users))
      .catch(err => of(new actions.SearchUsersFailAction(JSON.stringify(err))))
    );

  @Effect()
  addUserProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ADD_USER_PROJECT)
    .map(toPayload)
    .switchMap(({user, projectId}) => {
      return this.service$
        .addProjectRef(user, projectId)
        .map(task => new actions.AddUserProjectSuccessAction(task))
        .catch(err => of(new actions.AddUserProjectFailAction(JSON.stringify(err))));
      }
    );


  @Effect()
  removeUserProject$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.REMOVE_USER_PROJECT)
    .map(toPayload)
    .switchMap(({user, projectId}) => {
      return this.service$
        .removeProjectRef(user, projectId)
        .map(task => new actions.RemoveUserProjectSuccessAction(task))
        .catch(err => of(new actions.RemoveUserProjectFailAction(JSON.stringify(err))));
      }
    );

  @Effect()
  toLoadUser$: Observable<Action> = this.actions$
    .ofType(prjActions.ActionTypes.LOADS_SUCCESS)
    .map(toPayload)
    .switchMap((prjs: Project[]) => Observable.from(prjs.map(prj => prj.id)))
    .map((projectId: string) => new actions.LoadUsersByPrjAction(projectId));

  @Effect()
  loadProjectUsers$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOAD_USERS_BY_PRJ)
    .map(toPayload)
    .switchMap(projectId =>
      this.service$.getUsersByProject(projectId)
        .map(users => new actions.LoadUsersByPrjSuccessAction(users))
        .catch(err => of(new actions.LoadUsersByPrjFailAction(JSON.stringify(err))))
    );

  @Effect()
  batchUpdateProjectUsers$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.BATCH_UPDATE_USER_PROJECT)
    .map(toPayload)
    .switchMap(project =>
      this.service$.batchUpdateProjectRef(project)
        .map(users => new actions.BatchUpdateUserProjectSuccessAction(users))
        .catch(err => of(new actions.BatchUpdateUserProjectFailAction(err)))
    );


  /**
   * 任务的 Effects
   * @param actions$ 注入 action 数据流
   * @param service 注入任务服务
   * @param store$ 注入 redux store
   */
  constructor(private actions$: Actions,
              private service$: UserService,
              private store$: Store<fromRoot.State>) {
  }
}
