import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { TaskListVM, TaskVM } from '../../../vm';
import { getUnassignedTasks } from '../../../utils/project-menu.util';
import * as fromRoot from '../../../reducers';

@Component({
  selector: 'app-unassigned-task-list',
  templateUrl: './task-list-dialog.component.html',
  styleUrls: ['./task-list-dialog.component.scss']
})
export class UnassignedTaskListDialogComponent implements OnInit, OnDestroy {

  title: string;
  taskVMs: TaskVM[];

  private taskListVMs$: Observable<TaskListVM[]>;
  private _taskListVMsSub: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: string,
    private dialogRef: MatDialogRef<UnassignedTaskListDialogComponent>,
    private store$: Store<fromRoot.State>) {
    this.taskListVMs$ = this.store$.select(fromRoot.getTasksByList);
  }

  ngOnInit() {
    this.title = this.data;
    this._taskListVMsSub = this.taskListVMs$.subscribe((taskListVMs: TaskListVM[]) => {
      this.taskVMs = getUnassignedTasks(taskListVMs);
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
}
