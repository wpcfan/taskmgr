import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
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
  getTaskHistories,
  getTaskHistoryVMs,
  getTaskVM,
  getChartDateDescs,
  getChartTotalNumbers,
  getChartDoneNumbers
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
  taskHistoryVMs: TaskHistoryVM[] = [];
  options: Object;

  private taskListVMs$: Observable<TaskListVM[]>;
  private _taskListVMsSub: Subscription;
  private taskListVMs: TaskListVM[];

  private taskHistories$: Observable<TaskHistory[]>;
  private _taskHistoriesSub: Subscription;

  private chartDateDescs: string[] = getChartDateDescs();
  private chartTotalNumbers: number[] = [];
  private chartUndoneNumbers: number[] = [];
  private chartDoneNumbers: number[] = [];

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private store$: Store<fromRoot.State>) {
    this.taskListVMs$ = this.store$.select(fromRoot.getTasksByList);
    this.taskHistories$ = this.store$.select(fromRoot.getProjectTaskHistories);
  }

  ngOnInit() {
    this._taskListVMsSub = this.taskListVMs$.subscribe((taskListVMs: TaskListVM[]) => {
      this.unassignedNumber = getUnassignedTasks(taskListVMs).length;
      this.todayNumber = getTodayTasks(taskListVMs).length;
      this.taskListVMs = taskListVMs;

      this.chartTotalNumbers = getChartTotalNumbers(taskListVMs);
      this.chartDoneNumbers = getChartDoneNumbers(taskListVMs);

      this.buildChartOptions();
    });

    this._taskHistoriesSub = this.taskHistories$.subscribe((histories: TaskHistory[]) => {
      this.taskHistoryVMs = getTaskHistoryVMs(getTaskHistories(histories, 5));
    });
  }

  ngOnDestroy() {
    if (this._taskListVMsSub) {
      this._taskListVMsSub.unsubscribe();
    }

    if (this._taskHistoriesSub) {
      this._taskHistoriesSub.unsubscribe();
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

    if (!taskVM) {
      this.snackBar.open('任务不存在', '', { duration: 1000 });
      return;
    }

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

  private buildChartOptions() {
    const data1: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 6];
    const data2: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4];
    this.options = {
      chart: {
        type: 'area',
        backgroundColor: 'rgba(0,0,0,0)',
        height: 100,
        width: 290
      },
      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      xAxis: {
        labels: {
          enabled: false
        },
        gridLineWidth: 0,
        lineWidth: 0,
        tickWidth: 0,
        categories: this.chartDateDescs
      },
      yAxis: {
        labels: {
          enabled: false
        },
        title: {
          text: ''
        },
        endOnTick: false,
        gridLineWidth: 0
      },
      tooltip: {
        shared: true,
        crosshairs: false,
        shadow: false,
        backgroundColor: 'white',
        borderColor: '#EEEEEE',
        borderWidth: 2,
        x: undefined, //Because of strict mode
        formatter: function () {
          return `<span>${this.x}</span><br/>
            <span style="color: #3DA8F5">1 未完成</span><br/>
            <span style="color: #259B24">0 已完成</span><br/>`;
        }
      },
      plotOptions: {
        series: {
          animation: false,
          lineWidth: 1,
          marker: {
            enabled: false
          },
          states: {
            hover: {
              lineWidth: 1
            }
          }
        }
      },
      series: [{
        data: data1,
        lineColor: '#3DA8F5',
        color: '#CDEEFD',
        marker: {
          radius: 3,
          lineWidth: 3,
          lineColor: null,
          fillColor: '#3DA8F5'
        }
      }, {
        data: data2,
        lineColor: '#259B24',
        color: '#D1EBD0',
        marker: {
          radius: 4,
          lineWidth: 3,
          lineColor: null,
          fillColor: '#259B24'
        }
      }]
    };
  }
}
