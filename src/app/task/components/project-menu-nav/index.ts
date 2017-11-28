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
  getTaskHistoriesByTask,
  getChartTotalNumbers,
  getChartUndoneNumbers,
  getChartDoneNumbers,
  getChartTotalData,
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

  classContainer: string = 'project-menu-nav-container';
  classTitle: string = 'project-menu-nav-title';
  classCategoryHeader: string = 'project-menu-nav-category-header';
  classCategoryClickedHeader: string = 'project-menu-nav-category-clicked-header';
  classDivider: string = 'project-menu-nav-divider';
  classStatisticsItem: string = 'project-menu-nav-statistics-item';
  classChartHeader: string = 'project-menu-nav-chart-header';
  classChartBody: string = 'project-menu-nav-chart-body';

  unassignedNumber: number = 0;
  todayNumber: number = 0;
  taskHistoryVMs: TaskHistoryVM[] = [];
  options: Object;

  private taskListVMs$: Observable<TaskListVM[]>;
  private _taskListVMsSub: Subscription;
  private taskListVMs: TaskListVM[];

  private taskHistories$: Observable<TaskHistory[]>;
  private _taskHistoriesSub: Subscription;

  private theme$: Observable<boolean>;
  private _themeSub: Subscription;

  private chartDateDescs: string[] = getChartDateDescs();
  private chartTotalNumbers: number[] = [];
  private chartUndoneNumbers: number[] = [];
  private chartDoneNumbers: number[] = [];
  private chartTotalData: { number: number; y: number }[];

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private store$: Store<fromRoot.State>) {
    this.taskListVMs$ = this.store$.select(fromRoot.getTasksByList);
    this.taskHistories$ = this.store$.select(fromRoot.getProjectTaskHistories);
    this.theme$ = this.store$.select(fromRoot.getTheme);
  }

  ngOnInit() {
    this._taskListVMsSub = this.taskListVMs$.subscribe((taskListVMs: TaskListVM[]) => {
      this.unassignedNumber = getUnassignedTasks(taskListVMs).length;
      this.todayNumber = getTodayTasks(taskListVMs).length;
      this.taskListVMs = taskListVMs;
    });

    this._taskHistoriesSub = this.taskHistories$.subscribe((histories: TaskHistory[]) => {
      this.taskHistoryVMs = getTaskHistoryVMs(getTaskHistories(histories, 5));

      const taskHistoriesByTask: TaskHistory[][] = getTaskHistoriesByTask(histories);
      this.chartTotalNumbers = getChartTotalNumbers(taskHistoriesByTask);
      this.chartUndoneNumbers = getChartUndoneNumbers(taskHistoriesByTask);
      this.chartDoneNumbers = getChartDoneNumbers(taskHistoriesByTask);
      this.chartTotalData = getChartTotalData(this.chartTotalNumbers, this.chartUndoneNumbers);

      this.buildChartOptions();
    });

    this._themeSub = this.theme$.subscribe((dark: boolean) => {
      this.switchTheme(dark);
    })
  }

  ngOnDestroy() {
    if (this._taskListVMsSub) {
      this._taskListVMsSub.unsubscribe();
    }

    if (this._taskHistoriesSub) {
      this._taskHistoriesSub.unsubscribe();
    }

    if (this._themeSub) {
      this._themeSub.unsubscribe();
    }
  }

  switchTheme(dark: boolean) {
    if (!dark) {
      this.classContainer = 'project-menu-nav-container';
      this.classTitle = 'project-menu-nav-title';
      this.classCategoryHeader = 'project-menu-nav-category-header';
      this.classCategoryClickedHeader = 'project-menu-nav-category-clicked-header';
      this.classDivider = 'project-menu-nav-divider';
      this.classStatisticsItem = 'project-menu-nav-statistics-item';
      this.classChartHeader = 'project-menu-nav-chart-header';
      this.classChartBody = 'project-menu-nav-chart-body';
    }
    else {
      this.classContainer = 'project-menu-nav-container-dark';
      this.classTitle = 'project-menu-nav-title-dark';
      this.classCategoryHeader = 'project-menu-nav-category-header-dark';
      this.classCategoryClickedHeader = 'project-menu-nav-category-clicked-header-dark';
      this.classDivider = 'project-menu-nav-divider-dark';
      this.classStatisticsItem = 'project-menu-nav-statistics-item-dark';
      this.classChartHeader = 'project-menu-nav-chart-header-dark';
      this.classChartBody = 'project-menu-nav-chart-body-dark';
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
        points: [{ point: { number: undefined, y: undefined } }], //Because of strict mode
        formatter: function () {
          return `<span>${this.x}</span><br/>
            <span style="color: #3DA8F5">${this.points[0].point.number} 未完成</span><br/>
            <span style="color: #259B24">${this.points[1].point.y} 已完成</span><br/>`;
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
        data: this.chartTotalData,
        lineColor: '#3DA8F5',
        color: '#CDEEFD',
        marker: {
          radius: 3,
          lineWidth: 3,
          lineColor: null,
          fillColor: '#3DA8F5'
        }
      }, {
        data: this.chartDoneNumbers,
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
