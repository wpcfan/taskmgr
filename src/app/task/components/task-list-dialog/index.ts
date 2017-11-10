import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { TaskListVM, TaskVM } from '../../../vm';
import { getUnassignedTasks, getTodayTasks } from '../../../utils/project-menu.util';
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

  closeUnassignedTaskDialog() {
    this.dialogRef.close();
  }

  handleUpdateTask(taskVM: TaskVM) {
  }
}
