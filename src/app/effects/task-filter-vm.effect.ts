import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { TaskFilter, User } from '../domain';
import * as actions from '../actions/task-filter-vm.action';
import * as fromRoot from '../reducers';

@Injectable()
export class TaskFilterVMEffects {

  constructor(private actions$: Actions,
    private store$: Store<fromRoot.State>) {
  }

  @Effect()
  loadTaskFilterOwners$: Observable<Action> = this.actions$
    .ofType<actions.LoadTaskFilterOwnersAction>(actions.LOAD_OWNERS)
    .map(action => action.payload)
    .switchMap((taskFilter: TaskFilter) => this.store$
      .select(fromRoot.getProjectMembers(<string>taskFilter.projectId))
      .map((users: User[]) => new actions.LoadTaskFilterOwnersSuccessAction(users))
      .catch(err => of(new actions.LoadTaskFilterOwnersFailAction(JSON.stringify(err))))
    )
}
