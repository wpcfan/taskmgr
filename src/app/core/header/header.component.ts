import { Component, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers'
import * as actions from '../../actions/auth.action'
import * as entities from '../../domain';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  auth$: Observable<entities.Auth>;

  @Output("toggle") clickHandler: EventEmitter<void> = new EventEmitter<void>();

  constructor(private store$: Store<fromRoot.State>) { 
    this.auth$ = this.store$.select(fromRoot.getAuth);
  }

  onClick(){
    this.clickHandler.emit();
  }

  logout(){
    this.store$.dispatch({type: actions.ActionTypes.LOGOUT});
  }
}
