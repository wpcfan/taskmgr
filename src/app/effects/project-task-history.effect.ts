import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { TaskHistoryService } from '../services';
import { TaskHistory } from '../domain';
import * as actions from '../actions/project-task-history.action';
import * as fromRoot from '../reducers';

@Injectable()
export class ProjectTaskHistoryEffects {
  constructor(private actions$: Actions,
    private service$: TaskHistoryService,
    private store$: Store<fromRoot.State>) {
  }

  @Effect()
  loadProjectHistories$: Observable<Action> = this.actions$
    .ofType<actions.LoadProjectHistoryAction>(actions.LOAD)
    .map(action => action.payload)
    .switchMap((projectId: string) => this.service$
      .getProjectTaskHistories(projectId)
      .map((projectHistories: TaskHistory[]) => new actions.LoadProjectHistorySuccessAction(projectHistories))
      .catch(err => of(new actions.LoadProjectHistoryFailAction(JSON.stringify(err))))
    );
}
