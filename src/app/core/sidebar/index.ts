import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {getDate} from 'date-fns';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Auth, Project} from '../../domain';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/project.action';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  @Output() navClicked = new EventEmitter<void>();

  today = 'day';
  projects$: Observable<Project[]>;
  auth$: Observable<Auth>;

  constructor(private store$: Store<fromRoot.State>) {
    this.auth$ = this.store$.select(fromRoot.getAuth);
    this.projects$ = this.store$.select(fromRoot.getProjects);
    this.today = `day${getDate(new Date())}`;
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
