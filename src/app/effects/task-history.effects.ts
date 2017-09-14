import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { TaskHistoryService } from '../services';
import * as actions from '../actions/task-history.action';
import { TaskHistory } from '../domain';

@Injectable()
export class TaskHistoryEffects {

  constructor(private actions$: Actions, private services$: TaskHistoryService) {
  }

  @Effect()
  loadTaskHistories$: Observable<Action> = this.actions$
    .ofType<actions.LoadTaskHistoryAction>(actions.LOAD)
    .map(action => action.payload)
    .switchMap((taskId: string) => this.services$
      .getTaskHistory(taskId)
      .map((taskHistories: TaskHistory[]) => new actions.LoadHistorySuccessAction(taskHistories))
      .catch(err => of(new actions.LoadHistoryFailAction(JSON.stringify(err))))
    );
}
