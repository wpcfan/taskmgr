import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import * as entities from '../../domain';
import * as actions from '../../actions/project.action';
import { NewProjectComponent } from '../new-project/new-project.component';

@Component({
  selector: 'app-project-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects$: Observable<entities.Project>;

  constructor(
    private store$: Store<fromRoot.State>,
    private dialog: MdDialog) { 
    this.store$.dispatch({type: actions.ActionTypes.LOAD_PROJECTS});
    this.projects$ = this.store$.select(fromRoot.getProjects);
  }

  ngOnInit() {
  }

  selectProject(project: entities.Project){
 
  }

  openNewProjectDialog(){
    this.dialog.open(NewProjectComponent, {data:{}});
  }
}
