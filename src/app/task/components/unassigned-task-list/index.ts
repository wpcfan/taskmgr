import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { TaskListVM, TaskVM } from '../../../vm';
import {
  getUnassignedTasks,
  getDueDateDesc
} from '../../../utils/project-menu.util';
import * as fromRoot from '../../../reducers';

@Component({
  selector: 'app-unassigned-task-list',
  templateUrl: './unassigned-task-list.component.html',
  styleUrls: ['./unassigned-task-list.component.scss']
})
export class UnassignedTaskListComponent implements OnInit, OnDestroy {

  taskVMs: TaskVM[];

  private taskListVMs$: Observable<TaskListVM[]>;
  private _taskListVMsSub: Subscription;

  constructor(
    private dialogRef: MatDialogRef<UnassignedTaskListComponent>,
    private store$: Store<fromRoot.State>) {
    this.taskListVMs$ = this.store$.select(fromRoot.getTasksByList);
  }

  ngOnInit() {
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

  getDateDesc(date: Date): string {
    return getDueDateDesc(date);
  }
}
