import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { NewProjectComponent } from '../../../project/components/new-project';
import { TaskListDialogComponent } from '../../components/task-list-dialog';
import { TaskHistoryDialogComponent } from '../../components/task-history-dialog';
import { NewTaskComponent } from '../../components/new-task';
import { Project, TaskHistory } from '../../../domain';
import { TaskListVM, TaskHistoryVM, TaskVM } from '../../../vm';
import {
  getUnassignedTasks,
  getTodayTasks,
  getProjectTaskHistories,
  getProjectTaskHistoryVMs,
  getTaskVM
} from '../../../utils/project-menu.util';
import * as fromRoot from '../../../reducers';
import * as projectActions from '../../../actions/project.action';
import * as taskActions from '../../../actions/task.action';

@Component({
  selector: 'app-project-menu-nav',
  templateUrl: './project-menu-nav.component.html',
  styleUrls: ['./project-menu-nav.component.scss']
})
export class ProjectMenuNavComponent implements OnInit, OnDestroy {

  @Output() closeClicked = new EventEmitter<void>();

  unassignedNumber: number = 0;
  todayNumber: number = 0;
  projectTaskHistoryVMs: TaskHistoryVM[] = [];

  private taskListVMs$: Observable<TaskListVM[]>;
  private _taskListVMsSub: Subscription;
  private taskListVMs: TaskListVM[];

  private projectTaskHistories$: Observable<TaskHistory[]>;
  private _projectTaskHistoriesSub: Subscription;


  constructor(
    private dialog: MatDialog,
    private store$: Store<fromRoot.State>) {
    this.taskListVMs$ = this.store$.select(fromRoot.getTasksByList);
    this.projectTaskHistories$ = this.store$.select(fromRoot.getProjectTaskHistories);
  }

  ngOnInit() {
    this._taskListVMsSub = this.taskListVMs$.subscribe((taskListVMs: TaskListVM[]) => {
      this.unassignedNumber = getUnassignedTasks(taskListVMs).length;
      this.todayNumber = getTodayTasks(taskListVMs).length;
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

  onCloseClicked(ev: Event) {
    ev.preventDefault();
    this.closeClicked.emit();
  }

  openProjectDialog() {
    const thumbnails$ = this.getThumbnailsObs();
    let selectedProject: Project;

    this.store$.select(fromRoot.getSelectedProject)
      .take(1)
      .do((project: Project) => selectedProject = project)
      .map((project: Project) => this.dialog.open(NewProjectComponent, { data: { project: project, thumbnails: thumbnails$ } }))
      .switchMap((dialogRef: MatDialogRef<NewProjectComponent>) => dialogRef.afterClosed().take(1).filter(n => n))
      .subscribe(val => {
        const coverImg = this.buildImgSrc(val.coverImg);
        this.store$.dispatch(new projectActions.UpdateProjectAction({ ...val, id: selectedProject.id, coverImg: coverImg }));
      })
  }

  openUnassignedTaskListDialog() {
    const dialogRef: MatDialogRef<TaskListDialogComponent> = this.dialog.open(TaskListDialogComponent, {
      height: `${document.body.clientHeight - 100}px`,
      width: `600px`,
      data: { title: '待认领的任务', showUnassignedTaskList: true },
    });
  }

  openTodayTaskListDialog() {
    const dialogRef: MatDialogRef<TaskListDialogComponent> = this.dialog.open(TaskListDialogComponent, {
      height: `${document.body.clientHeight - 100}px`,
      width: `600px`,
      data: { title: '今天的任务', showUnassignedTaskList: false },
    });
  }

  openTaskHistoryDialog() {
    const dialogRef: MatDialogRef<TaskHistoryDialogComponent> = this.dialog.open(TaskHistoryDialogComponent, {
      height: `${document.body.clientHeight - 100}px`,
      width: `600px`,
    });
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

  private getThumbnailsObs(): Observable<string[]> {
    return Observable
      .range(0, 40)
      .map(i => `/assets/img/covers/${i}_tn.jpg`)
      .reduce((r, x) => {
        return [...r, x];
      }, []);
  }

  private buildImgSrc(img: string): string {
    return img.indexOf('_') > -1 ? img.split('_', 1)[0] + '.jpg' : img;
  }
}
