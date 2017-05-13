import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import * as models from '../../domain';
import * as actions from '../../actions/project.action';
import { NewProjectComponent } from '../new-project';
import { dropFromTopAnim } from '../../anim';

@Component({
  selector: 'app-project-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [dropFromTopAnim]
})
export class ProjectListComponent {
  
  projects$: Observable<models.Project>;

  constructor(
    private store$: Store<fromRoot.State>,
    private dialog: MdDialog) { 
    this.store$.dispatch(new actions.LoadProjectsAction({}));
    this.projects$ = this.store$.select(fromRoot.getProjects);
  }

  selectProject(project: models.Project){
    this.store$.dispatch(new actions.SelectProjectAction(project));
  }

  openNewProjectDialog(){
    this.dialog.open(NewProjectComponent, {data:{}});
  }
}
