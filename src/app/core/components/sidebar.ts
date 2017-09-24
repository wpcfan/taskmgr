import {ChangeDetectionStrategy, Component, EventEmitter, Output, Input} from '@angular/core';
import {getDate} from 'date-fns';
import {Project} from '../../domain';

@Component({
  selector: 'app-sidebar',
  template: `
    <div *ngIf="auth">
      <mat-nav-list>
        <h3 matSubheader>项目</h3>
        <mat-list-item [routerLink]="['/projects']" (click)="handleClicked($event)">
          <mat-icon mat-list-icon svgIcon="projects"></mat-icon>
          <span matLine>项目首页</span>
          <span matLine matSubheader> 查看您参与的全部项目 </span>
        </mat-list-item>
        <mat-list-item *ngFor="let prj of projects" (click)="onPrjClicked($event, prj)">
          <mat-icon mat-list-icon svgIcon="project"></mat-icon>
          <a matLine>
            {{prj.name}}
          </a>
          <span matLine matSubheader> {{prj.desc}} </span>
        </mat-list-item>
        <mat-divider></mat-divider>
        <h3 matSubheader>日历</h3>
        <mat-list-item [routerLink]="['/mycal/month']" (click)="handleClicked($event)">
          <mat-icon mat-list-icon svgIcon="month"></mat-icon>
          <span matLine>月视图</span>
          <span matLine matSubheader> 按月方式查看事件 </span>
        </mat-list-item>
        <mat-list-item [routerLink]="['/mycal/week']" (click)="handleClicked($event)">
          <mat-icon mat-list-icon svgIcon="week"></mat-icon>
          <span matLine>星期视图</span>
          <span matLine matSubheader> 按星期方式查看事件 </span>
        </mat-list-item>
        <mat-list-item [routerLink]="['/mycal/day']" (click)="handleClicked($event)">
          <mat-icon mat-list-icon [svgIcon]="today"></mat-icon>
          <span matLine>当日视图</span>
          <span matLine matSubheader> 按天方式查看事件 </span>
        </mat-list-item>
      </mat-nav-list>
    </div>
  `,
  styles: [`
    .day-num {
      font-size: 48px;
      width: 48px;
      height: 48px;
    }

    mat-icon {
      align-self: flex-start;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {

  @Input() projects: Project[];
  @Input() auth = false;
  @Output() navClicked = new EventEmitter<void>();
  @Output() prjClicked = new EventEmitter<Project>();

  today = 'day';

  constructor() {
    this.today = `day${getDate(new Date())}`;
  }

  handleClicked(ev: Event) {
    ev.preventDefault();
    this.navClicked.emit();
  }

  onPrjClicked(ev: Event, prj: Project) {
    ev.preventDefault();
    this.prjClicked.emit(prj)
  }
}
