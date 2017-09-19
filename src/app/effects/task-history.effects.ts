import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { TaskHistoryService } from '../services';
import * as actions from '../actions/task-history.action';
import * as taskActions from '../actions/task.action';
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
  addTaskHistory$: Observable<Action> = this.actions$
    .ofType<actions.AddTaskHistoryAction>(actions.ADD)
    .map(action => action.payload)
    .withLatestFrom(this.store$.select(fromRoot.getAuthUser))
    .mergeMap(([data, user]: [{ taskId: string; operation: History.TaskOperations }, User]) => {
      const operator: User = {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      };

      const taskHistory: TaskHistory = {
        taskId: data.taskId,
        operator: operator,
        operation: data.operation,
        date: new Date(),
      }

      console.log('<<Add Task History>>', JSON.stringify(taskHistory));

      return this.services$.addTaskHistory(taskHistory)
        .map((history: TaskHistory) => new actions.AddTaskHistorySuccessAction(history))
        .catch(err => of(new actions.AddTaskHistoryFailAction(JSON.stringify(err))))
    });

  @Effect()
  addCreateTaskHistory$: Observable<Action> = this.actions$
    .ofType<taskActions.AddTaskSuccessAction>(taskActions.ADD_SUCCESS)
    .map(action => action.payload)
    .map((task: Task) => {
      const operation: History.CreateTaskOperation = new History.CreateTaskOperation(task.desc);

      return new actions.AddTaskHistoryAction({ taskId: <string>task.id, operation: operation });
    })

  @Effect()
  addCompleteOrRecreateTaskHistory$: Observable<Action> = this.actions$
    .ofType<taskActions.CompleteTaskSuccessAction>(taskActions.COMPLETE_SUCCESS)
    .map(action => action.payload)
    .map((task: Task) => {
      const operation: History.TaskOperations = task.completed ? new History.CompleteTaskOperation() : new History.RecreateTaskOperation();

      return new actions.AddTaskHistoryAction({ taskId: <string>task.id, operation: operation });
    });

  @Effect({ dispatch: false })
  addUpdateTaskHistory$: Observable<[Task, Task | null]> = this.actions$
    .ofType<taskActions.UpdateTaskSuccessAction>(taskActions.UPDATE_SUCCESS)
    .map(action => action.payload)
    .withLatestFrom(this.store$.select(fromRoot.getSelectedTask))
    .do(([updatedTask, selectedTask]: [Task, Task | null]) => {
      if (null === selectedTask)
        return;

      if (updatedTask.desc !== selectedTask.desc) {
        const operation: History.TaskOperations = new History.UpdateTaskContentOperation(updatedTask.desc);
        this.store$.dispatch(new actions.AddTaskHistoryAction({ taskId: <string>updatedTask.id, operation: operation }));
      }

      if (updatedTask.priority !== selectedTask.priority) {
        const operation: History.TaskOperations = new History.UpdateTaskPriorityOperation(updatedTask.priority);
        this.store$.dispatch(new actions.AddTaskHistoryAction({ taskId: <string>updatedTask.id, operation: operation }));
      }

      if (updatedTask.remark !== selectedTask.remark) {
        //The remark of Quick-Task is undefined and the remark of updated task may be null
        if (!updatedTask.remark && !selectedTask.remark)
          return;

        const operation: History.TaskOperations = new History.UpdateTaskRemarkOperation(<string>updatedTask.remark);
        this.store$.dispatch(new actions.AddTaskHistoryAction({ taskId: <string>updatedTask.id, operation: operation }));
      }
    });

}
