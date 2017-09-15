import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { TaskHistoryService } from '../services';
import * as actions from '../actions/task-history.action';
import * as fromRoot from '../reducers';
import * as History from '../domain/history';
import { User, Task, TaskHistory } from '../domain';

@Injectable()
export class TaskHistoryEffects {

  constructor(private actions$: Actions,
    private services$: TaskHistoryService,
    private store$: Store<fromRoot.State>) {
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

  @Effect()
  addCreateTaskHistory$: Observable<Action> = this.actions$
    .ofType<actions.CreateTaskAction>(actions.CREATE_TASK)
    .map(action => action.payload)
    .withLatestFrom(this.store$.select(fromRoot.getAuthUser))
    .switchMap(([task, user]: [Task, User]) => {
      const operator: User = {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      }

      const operation: History.CreateTaskOperation = {
        type: History.CREATE_TASK,
        payload: task.desc
      };

      const taskHistory: TaskHistory = {
        taskId: <string>task.id,
        operator: operator,
        operation: operation,
        date: new Date(),
      }

      console.log('<<Create Task History>>', JSON.stringify(taskHistory));

      return this.services$
        .addTaskHistory(taskHistory)
        .map((history: TaskHistory) => new actions.CreateTaskSuccessAction(history))
        .catch(err => of(new actions.CreateTaskFailAction(JSON.stringify(err))))
    });
}
