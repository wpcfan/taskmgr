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
import { TaskVM } from '../vm';

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
  addUpdateTaskHistory$: Observable<{ selectedTaskVM: TaskVM; updatedTaskVM: TaskVM; user: User }> = this.actions$
    .ofType<taskActions.UpdateTaskSuccessAction>(taskActions.UPDATE_SUCCESS)
    .map(action => action.payload)
    .withLatestFrom(this.store$.select(fromRoot.getSelectedTask), (_: Task, selectedTaskVM: TaskVM) => selectedTaskVM)
    .withLatestFrom(this.store$.select(fromRoot.getUpdatedTask), (selectedTaskVM: TaskVM, updatedTaskVM: TaskVM) => ({ selectedTaskVM: selectedTaskVM, updatedTaskVM: updatedTaskVM }))
    .withLatestFrom(this.store$.select(fromRoot.getAuthUser), (val, user: User) => ({ ...val, user: user }))
    .do((data: { selectedTaskVM: TaskVM; updatedTaskVM: TaskVM; user: User }) => {
      const selectedTaskVM: TaskVM = data.selectedTaskVM;
      const updatedTaskVM: TaskVM = data.updatedTaskVM;
      // const updatedTask: Task = data.updatedTask;

      if (null === selectedTaskVM || null === updatedTaskVM)
        return;

      if (updatedTaskVM.desc !== selectedTaskVM.desc) {
        const operation: History.TaskOperations = new History.UpdateTaskContentOperation(updatedTaskVM.desc);
        this.store$.dispatch(new actions.AddTaskHistoryAction({ taskId: <string>updatedTaskVM.id, operation: operation }));
      }

      if (updatedTaskVM.priority !== selectedTaskVM.priority) {
        const operation: History.TaskOperations = new History.UpdateTaskPriorityOperation(updatedTaskVM.priority);
        this.store$.dispatch(new actions.AddTaskHistoryAction({ taskId: <string>updatedTaskVM.id, operation: operation }));
      }

      if (updatedTaskVM.remark !== selectedTaskVM.remark) {
        //The remark of Quick-Task is undefined and the remark of updated task will be null event if you did nothing.

        if (updatedTaskVM.remark) {
          const operation: History.TaskOperations = new History.UpdateTaskRemarkOperation(<string>updatedTaskVM.remark);
          this.store$.dispatch(new actions.AddTaskHistoryAction({ taskId: <string>updatedTaskVM.id, operation: operation }));
        } else {
          if (selectedTaskVM.remark) {
            const operation: History.TaskOperations = new History.ClearTaskRemarkOperation();
            this.store$.dispatch(new actions.AddTaskHistoryAction({ taskId: <string>updatedTaskVM.id, operation: operation }));
          }
        }
      }

      const selectedDueDate = selectedTaskVM.dueDate ? new Date(selectedTaskVM.dueDate).getTime() : null;
      const updatedDueDate = updatedTaskVM.dueDate ? new Date(updatedTaskVM.dueDate).getTime() : null;

      if (selectedDueDate !== updatedDueDate) {
        if (updatedDueDate !== null) {
          const operation: History.UpdateTaskDueDateOperation = new History.UpdateTaskDueDateOperation(<Date>updatedTaskVM.dueDate);
          this.store$.dispatch(new actions.AddTaskHistoryAction({ taskId: <string>updatedTaskVM.id, operation: operation }));
        } else {
          const operation: History.ClearTaskDueDateOperation = new History.ClearTaskDueDateOperation();
          this.store$.dispatch(new actions.AddTaskHistoryAction({ taskId: <string>updatedTaskVM.id, operation: operation }));
        }
      }

      const authUserId = data.user.id;
      const selectedOwnerUserId = selectedTaskVM.owner ? selectedTaskVM.owner.id : null;
      const updatedOwnerUserId = updatedTaskVM.owner ? updatedTaskVM.owner.id : null;

      if (selectedOwnerUserId !== updatedOwnerUserId) {
        if (updatedOwnerUserId) {
          if (updatedOwnerUserId === authUserId) {
            const operation: History.ClaimTaskOperation = new History.ClaimTaskOperation();
            this.store$.dispatch(new actions.AddTaskHistoryAction({ taskId: <string>updatedTaskVM.id, operation: operation }));
          } else {
            const operation: History.AssignTaskOperation = new History.AssignTaskOperation(<User>updatedTaskVM.owner);
            this.store$.dispatch(new actions.AddTaskHistoryAction({ taskId: <string>updatedTaskVM.id, operation: operation }));
          }
        } else {
          const operation: History.RemoveTaskExecutorOperation = new History.RemoveTaskExecutorOperation();
          this.store$.dispatch(new actions.AddTaskHistoryAction({ taskId: <string>updatedTaskVM.id, operation: operation }));
        }
      }
    });

}
