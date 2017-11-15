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
  selector: 'app-today-task-list',
  templateUrl: './task-list-dialog.component.html',
  styleUrls: ['./task-list-dialog.component.scss']
})
export class TaskListDialogComponent implements OnInit, OnDestroy {

  title: string;
  taskVMs: TaskVM[];

  private taskListVMs$: Observable<TaskListVM[]>;
  private _taskListVMsSub: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { title: string; showUnassignedTaskList: boolean },
    private dialogRef: MatDialogRef<TaskListDialogComponent>,
    private dialog: MatDialog,
    private store$: Store<fromRoot.State>) {
    this.taskListVMs$ = this.store$.select(fromRoot.getTasksByList);
  }

  ngOnInit() {
    this.title = this.data.title;
    this._taskListVMsSub = this.taskListVMs$.subscribe((taskListVMs: TaskListVM[]) => {
      this.taskVMs = this.data.showUnassignedTaskList ? getUnassignedTasks(taskListVMs) : getTodayTasks(taskListVMs);
    });
  }

  ngOnDestroy() {
    if (this._taskListVMsSub) {
      this._taskListVMsSub.unsubscribe();
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
