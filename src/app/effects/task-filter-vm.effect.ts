import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { TaskFilter, User } from '../domain';
import * as actions from '../actions/task-filter-vm.action';
import * as fromRoot from '../reducers';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class TaskFilterVMEffects {
  @Effect()
  loadTaskFilterOwners$: Observable<Action> = this.actions$.pipe(
    ofType<actions.LoadTaskFilterOwnersAction>(actions.LOAD_OWNERS),
    map(action => action.payload),
    switchMap((taskFilter: TaskFilter) =>
      this.store$.pipe(
        select(fromRoot.getProjectMembers(<string>taskFilter.projectId)),
        map(
          (users: User[]) =>
            new actions.LoadTaskFilterOwnersSuccessAction(users)
        ),
        catchError(err =>
          of(new actions.LoadTaskFilterOwnersFailAction(JSON.stringify(err)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>
  ) {}
}
