import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/auth.action';
import {Auth} from '../../domain';

@Component({
  selector: 'app-header',
  template: `
    <md-toolbar color="primary">
      <button md-icon-button (click)="onClick()" *ngIf="(auth$ | async)?.user">
        <md-icon>menu</md-icon>
      </button>
      <span>企业协作平台</span>
      <span class="fill-remaining-space"></span>
      <md-slide-toggle (change)="onChange($event.checked)">黑夜模式</md-slide-toggle>
      <span><a md-button *ngIf="(auth$ | async)?.user" (click)="logout()">退出</a></span>
    </md-toolbar>
  `,
  styles: [`
  `],
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
