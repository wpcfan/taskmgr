import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/auth.action';
import {Auth} from '../../domain';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  auth$: Observable<Auth>;

  @Output() toggle = new EventEmitter<void>();
  @Output() toggleDarkTheme = new EventEmitter<boolean>();

  constructor(private store$: Store<fromRoot.State>) {
    this.auth$ = this.store$.select(fromRoot.getAuth);
  }

  onClick() {
    this.toggle.emit();
  }

  logout() {
    this.store$.dispatch({type: actions.ActionTypes.LOGOUT});
  }

  onChange(checked) {
    this.toggleDarkTheme.emit(checked);
  }
}
