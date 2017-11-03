import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';

@Component({
  selector: 'app-project-menu-nav',
  templateUrl: './project-menu-nav.component.html',
  styleUrls: ['./project-menu-nav.component.scss']
})
export class ProjectMenuNavComponent implements OnInit {
  constructor(private store$: Store<fromRoot.State>) {

  }

  ngOnInit() {

  }
}
