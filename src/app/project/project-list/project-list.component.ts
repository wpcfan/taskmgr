import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import * as entities from '../../domain';
import * as actions from '../../actions/project.action';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  
  projects$: Observable<entities.Project>;

  constructor(private store$: Store<fromRoot.State>) { 
    this.store$.dispatch({type: actions.ActionTypes.LOAD_PROJECTS});
    this.projects$ = this.store$.select(fromRoot.getProjects);
  }

  ngOnInit() {
  }

}
