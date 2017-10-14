import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {UserService} from '../services';
import * as actions from '../actions/user.action';
import * as prjActions from '../actions/project.action';
import {Project} from '../domain';

@Injectable()
export class UserEffects {
  /**
   *
   */
  @Effect()
  searchUsers$: Observable<Action> = this.actions$
    .ofType<actions.SearchUsersAction>(actions.SEARCH_USERS)
    .map(action => action.payload)
    .switchMap((str) => this.service$
      .searchUsers(str)
      .map(users => new actions.SearchUsersSuccessAction(users))
      .catch(err => of(new actions.SearchUsersFailAction(JSON.stringify(err))))
    );

  @Effect()
  addUserProject$: Observable<Action> = this.actions$
    .ofType<actions.AddUserProjectAction>(actions.ADD_USER_PROJECT)
    .map(action => action.payload)
    .switchMap(({user, projectId}) => {
      return this.service$
        .addProjectRef(user, projectId)
        .map(u => new actions.AddUserProjectSuccessAction(u))
        .catch(err => of(new actions.AddUserProjectFailAction(JSON.stringify(err))));
      }
    );


  @Effect()
  removeUserProject$: Observable<Action> = this.actions$
    .ofType<actions.RemoveUserProjectAction>(actions.REMOVE_USER_PROJECT)
    .map(action => action.payload)
    .switchMap(({user, projectId}) => {
      return this.service$
        .removeProjectRef(user, projectId)
        .map(u => new actions.RemoveUserProjectSuccessAction(u))
        .catch(err => of(new actions.RemoveUserProjectFailAction(JSON.stringify(err))));
      }
    );

  @Effect()
  batchUpdateProjectUsers$: Observable<Action> = this.actions$
    .ofType<actions.BatchUpdateUserProjectAction>(actions.BATCH_UPDATE_USER_PROJECT)
    .map(action => action.payload)
    .switchMap(project =>
      this.service$.batchUpdateProjectRef(project)
        .map(users => new actions.BatchUpdateUserProjectSuccessAction(users))
        .catch(err => of(new actions.BatchUpdateUserProjectFailAction(err)))
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
