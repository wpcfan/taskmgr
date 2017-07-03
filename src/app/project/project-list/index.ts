import {ChangeDetectionStrategy, Component, HostBinding, OnDestroy} from '@angular/core';
import {MdDialog} from '@angular/material';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/range';
import 'rxjs/add/operator/take';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/project.action';
import {NewProjectComponent} from '../new-project';
import {InviteComponent} from '../invite';
import {ConfirmDialogComponent} from '../../shared';
import {defaultRouteAnim, listAnimation} from '../../anim';
import { Project } from '../../domain';

@Component({
  selector: 'app-project-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container" [@listAnim]="(projects$ | async).length">
      <app-project-item
        class="card"
        *ngFor="let project of (projects$ | async)"
        [item]="project"
        (itemSelected)="selectProject(project)"
        (launchUpdateDialog)="openUpdateDialog(project)"
        (launchInviteDailog)="openInviteDialog(project)"
        (launchDeleteDailog)="openDeleteDialog(project)">
      </app-project-item>
    </div>
    <button md-fab (click)="openNewProjectDialog()" type="button" class="fab-button">
      <md-icon>add</md-icon>
    </button>
  `,
  styles: [`
    .container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .card {
      height: 360px;
      flex: 0 0 360px;
      margin: 10px;
    }
    .fab-button {
      position: fixed;
      right: 32px;
      bottom: 96px;
      z-index: 998;
    }
  `],
  animations: [defaultRouteAnim, listAnimation],
})
export class ProjectListComponent {

  @HostBinding('@routeAnim') state;
  projects$: Observable<Project[]>;

  constructor(private store$: Store<fromRoot.State>,
              private dialog: MdDialog) {
    this.store$.dispatch(new actions.LoadProjectsAction({}));
    this.projects$ = this.store$.select(fromRoot.getProjects);
  }

  selectProject(project: Project) {
    this.store$.dispatch(new actions.SelectProjectAction(project));
  }

  openNewProjectDialog() {
    const img = `/assets/img/covers/${Math.floor(Math.random() * 39).toFixed(0)}_tn.jpg`;
    const thumbnails$ = this.getThumbnailsObs();
    const dialogRef = this.dialog.open(NewProjectComponent, {data: { thumbnails: thumbnails$, img: img}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        const converImg = this.buildImgSrc(val.coverImg);
        this.store$.dispatch(new actions.AddProjectAction({...val, coverImg: converImg}));
      }
    });
  }

  openUpdateDialog(project) {
    const thumbnails$ = this.getThumbnailsObs();
    const dialogRef = this.dialog.open(NewProjectComponent, {data: { project: project, thumbnails: thumbnails$}});
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        const converImg = this.buildImgSrc(val.coverImg);
        this.store$.dispatch(new actions.UpdateProjectAction({...val, id: project.id, coverImg: converImg}));
      }
    });
  }

  openInviteDialog(project) {
    let members = [];
    this.store$.select(fromRoot.getProjectMembers(project.id))
      .take(1)
      .subscribe(m => members = m);
    const dialogRef = this.dialog.open(InviteComponent, {data: { members: members}});
    // 使用 take(1) 来自动销毁订阅，因为 take(1) 意味着接收到 1 个数据后就完成了
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        this.store$.dispatch(new actions.InviteMembersAction({projectId: project.id, members: val}));
      }
    });
  }

  openDeleteDialog(project) {
    const confirm = {
      title: '删除项目：',
      content: '确认要删除该项目？',
      confirmAction: '确认删除'
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {dialog: confirm}});

    // 使用 take(1) 来自动销毁订阅，因为 take(1) 意味着接收到 1 个数据后就完成了
    dialogRef.afterClosed().take(1).subscribe(val => {
      if (val) {
        this.store$.dispatch(new actions.DeleteProjectAction(project));
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
