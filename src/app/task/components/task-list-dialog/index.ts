import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { TaskListVM, TaskVM } from '../../../vm';
import { Task } from '../../../domain';
import { getUnassignedTasks, getTodayTasks } from '../../../utils/project-menu.util';
import { NewTaskComponent } from '../../components/new-task';
import * as taskActions from '../../../actions/task.action';
import * as fromRoot from '../../../reducers';

@Component({
  selector: 'app-task-list-dialog',
  templateUrl: './task-list-dialog.component.html',
  styleUrls: ['./task-list-dialog.component.scss']
})
export class TaskListDialogComponent implements OnInit, OnDestroy {

  classHeader: string = 'task-list-header';
  classDivider: string = 'task-list-item-divider';

  title: string;
  taskVMs: TaskVM[];

  private taskListVMs$: Observable<TaskListVM[]>;
  private _taskListVMsSub: Subscription;

  private theme$: Observable<boolean>;
  private _themeSub: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { title: string; showUnassignedTaskList: boolean },
    private dialogRef: MatDialogRef<TaskListDialogComponent>,
    private dialog: MatDialog,
    private store$: Store<fromRoot.State>) {
    this.taskListVMs$ = this.store$.select(fromRoot.getTasksByList);
    this.theme$ = this.store$.select(fromRoot.getTheme);
  }

  ngOnInit() {
    this.title = this.data.title;
    this._taskListVMsSub = this.taskListVMs$.subscribe((taskListVMs: TaskListVM[]) => {
      this.taskVMs = this.data.showUnassignedTaskList ? getUnassignedTasks(taskListVMs) : getTodayTasks(taskListVMs);
    });

    this._themeSub = this.theme$.subscribe((dark: boolean) => {
      this.switchTheme(dark);
    })
  }

  ngOnDestroy() {
    if (this._taskListVMsSub) {
      this._taskListVMsSub.unsubscribe();
    }

    if (this._themeSub) {
      this._themeSub.unsubscribe();
    }
  }

  switchTheme(dark: boolean) {
    if (!dark) {
      this.classHeader = 'task-list-header';
      this.classDivider = 'task-list-item-divider';
    }
    else {
      this.classHeader = 'task-list-header-dark';
      this.classDivider = 'task-list-item-divider-dark';
    }
  }

  closeTaskListDialog() {
    this.dialogRef.close();
  }

  completeTask(task: Task) {
    this.store$.dispatch(new taskActions.CompleteTaskAction(task));
  }

  openTaskDialog(taskVM: TaskVM) {
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
