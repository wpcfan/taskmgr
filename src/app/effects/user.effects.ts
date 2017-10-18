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

  /**
   * 任务的 Effects
   * @param actions$ 注入 action 数据流
   * @param service$ 注入任务服务
   */
  constructor(private actions$: Actions,
              private service$: UserService) {
  }
}
