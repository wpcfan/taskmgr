import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';
import {getDate} from 'date-fns';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import {Observable} from 'rxjs/Observable';
import {Auth, Project} from '../../domain';
import * as actions from '../../actions/project.action';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  @Output() navClicked = new EventEmitter<void>();
  days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
  ];
  today = 'day';
  projects$: Observable<Project>;
  auth$: Observable<Auth>;

  constructor(private store$: Store<fromRoot.State>,
              private iconRegistry: MdIconRegistry,
              private sanitizer: DomSanitizer) {
    this.auth$ = this.store$.select(fromRoot.getAuth);
    this.projects$ = this.store$.select(fromRoot.getProjects);
    this.initializeSvgIconSet();
    this.today = `day${getDate(new Date())}`;
  }

  initializeSvgIconSet() {
    this.iconRegistry.addSvgIcon(
      'project',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/sidebar/project.svg'));
    this.iconRegistry.addSvgIcon(
      'projects',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/sidebar/projects.svg'));
    this.iconRegistry.addSvgIcon(
      'month',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/sidebar/month.svg'));
    this.iconRegistry.addSvgIcon(
      'week',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/sidebar/week.svg'));
    this.iconRegistry.addSvgIcon(
      'day',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/sidebar/day.svg'));
    this.days.forEach(day => {
      this.iconRegistry.addSvgIcon(
        `day${day}`,
        this.sanitizer.bypassSecurityTrustResourceUrl(`assets/img/days/day${day}.svg`));
    });

  }

  handleClicked(ev: Event) {
    ev.preventDefault();
    this.navClicked.emit();
  }

  handlePrjClicked(ev: Event, prj: Project) {
    ev.preventDefault();
    this.store$.dispatch(new actions.SelectProjectAction(prj));
    this.navClicked.emit();
  }
}
