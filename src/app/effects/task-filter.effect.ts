import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { TaskFilterService } from '../services';
import * as actions from '../actions/task-filter.action';
import * as projectActions from '../actions/project.action';
import * as fromRoot from '../reducers';
import { TaskFilter } from '../domain';

@Injectable()
export class TaskFilterEffects {

  constructor(private actions$: Actions,
    private service$: TaskFilterService,
    private store$: Store<fromRoot.State>) {
  }

  @Effect()
  loadTaskFilter$: Observable<Action> = this.actions$
    .ofType<projectActions.SelectProjectAction>(projectActions.SELECT)
    .map(action => action.payload.id)
    .switchMap((projectId: string) => this.service$
      .getTaskFilter(projectId)
      .map((taskFilter: TaskFilter) => new actions.LoadTaskFilterSuccessAction(taskFilter))
      .catch(err => of(new actions.LoadTaskFilterFailAction(JSON.stringify(err))))
    );
}


