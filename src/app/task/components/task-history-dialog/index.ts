import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { NewTaskComponent } from '../../components/new-task';
import { TaskHistory } from '../../../domain';
import { TaskListVM, TaskHistoryVM, TaskVM } from '../../../vm';
import {
  getProjectTaskHistories,
  getProjectTaskHistoryVMs,
  getTaskVM
} from '../../../utils/project-menu.util';
import * as fromRoot from '../../../reducers';
import * as taskActions from '../../../actions/task.action';

@Component({
  selector: 'app-task-history-dialog',
  templateUrl: './task-history-dialog.component.html',
  styleUrls: ['./task-history-dialog.component.scss']
})
export class TaskHistoryDialogComponent implements OnInit, OnDestroy {

  projectTaskHistoryVMs: TaskHistoryVM[] = [];

  private taskListVMs$: Observable<TaskListVM[]>;
  private _taskListVMsSub: Subscription;
  private taskListVMs: TaskListVM[];

  private projectTaskHistories$: Observable<TaskHistory[]>;
  private _projectTaskHistoriesSub: Subscription;

  constructor(private dialog: MatDialog,
    private store$: Store<fromRoot.State>) {
    this.taskListVMs$ = this.store$.select(fromRoot.getTasksByList);
    this.projectTaskHistories$ = this.store$.select(fromRoot.getProjectTaskHistories);
  }

  ngOnInit() {
    this._taskListVMsSub = this.taskListVMs$.subscribe((taskListVMs: TaskListVM[]) => {
      this.taskListVMs = taskListVMs;
    });

    this._projectTaskHistoriesSub = this.projectTaskHistories$.subscribe((histories: TaskHistory[]) => {
      this.projectTaskHistoryVMs = getProjectTaskHistoryVMs(getProjectTaskHistories(histories, 5));
    });
  }

  ngOnDestroy() {
    if (this._taskListVMsSub) {
      this._taskListVMsSub.unsubscribe();
    }

    if (this._projectTaskHistoriesSub) {
      this._projectTaskHistoriesSub.unsubscribe();
    }
  }

  openTaskDialog(taskId: string) {
    const taskVM: TaskVM = getTaskVM(taskId, this.taskListVMs);

    this.store$.dispatch(new taskActions.SelectTaskAction(taskVM));

    const dialogRef: MatDialogRef<NewTaskComponent> = this.dialog.open(NewTaskComponent, { data: { task: taskVM } });
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .subscribe((val) => {
        if (val.type !== 'delete') {
          this.store$.dispatch(new taskActions.UpdateTaskAction({ ...taskVM, ...val.task }));
        } else {
          this.store$.dispatch(new taskActions.DeleteTaskAction(val.task));
        }
      });
  }
}
