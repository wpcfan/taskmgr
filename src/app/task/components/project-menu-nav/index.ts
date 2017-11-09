import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { UnassignedTaskListComponent } from '../../components/task-list-dialog/unassigned-task-list.component';
import { TodayTaskListComponent } from '../../components/task-list-dialog/today-task-list.component';
import { TaskListVM } from '../../../vm';
import {
  getUnassignedTasks,
  getTodayTasks
} from '../../../utils/project-menu.util';
import * as fromRoot from '../../../reducers';

@Component({
  selector: 'app-project-menu-nav',
  templateUrl: './project-menu-nav.component.html',
  styleUrls: ['./project-menu-nav.component.scss']
})
export class ProjectMenuNavComponent implements OnInit, OnDestroy {

  @Output() closeClicked = new EventEmitter<void>();

  unassignedNumber: number = 0;
  todayNumber: number = 0;

  private taskListVMs$: Observable<TaskListVM[]>;
  private _taskListVMsSub: Subscription;

  constructor(
    private unassignedTaskDialog: MatDialog,
    private todayTaskDialog: MatDialog,
    private store$: Store<fromRoot.State>) {
    this.taskListVMs$ = this.store$.select(fromRoot.getTasksByList);
  }

  ngOnInit() {
    this._taskListVMsSub = this.taskListVMs$.subscribe((taskListVMs: TaskListVM[]) => {
      this.unassignedNumber = getUnassignedTasks(taskListVMs).length;
      this.todayNumber = getTodayTasks(taskListVMs).length;
    });
  }

  ngOnDestroy() {
    if (this._taskListVMsSub) {
      this._taskListVMsSub.unsubscribe();
    }
  }

  onCloseClicked(ev: Event) {
    ev.preventDefault();
    this.closeClicked.emit();
  }

  openUnassignedTaskDialog() {
    const dialogRef: MatDialogRef<UnassignedTaskListComponent> = this.unassignedTaskDialog.open(UnassignedTaskListComponent, {
      height: `${document.body.clientHeight - 100}px`,
      width: `600px`,
      data: '待认领的任务',
    });
  }

  openTodayTaskDialog() {
    const dialogRef: MatDialogRef<TodayTaskListComponent> = this.todayTaskDialog.open(TodayTaskListComponent, {
      height: `${document.body.clientHeight - 100}px`,
      width: `600px`,
      data: '今天的任务',
    });
  }
}
