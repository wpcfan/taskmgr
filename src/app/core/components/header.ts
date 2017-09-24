import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/auth.action';
import {Auth} from '../../domain';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="onClick()" *ngIf="auth">
        <mat-icon>menu</mat-icon>
      </button>
      <span>企业协作平台</span>
      <span class="fill-remaining-space"></span>
      <mat-slide-toggle (change)="onChange($event.checked)">黑夜模式</mat-slide-toggle>
      <span><a mat-button *ngIf="auth" (click)="handleLogout()">退出</a></span>
    </mat-toolbar>
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
    this.store$.dispatch({type: actions.LOGOUT});
  }

  onChange(checked: boolean) {
    this.toggleDarkTheme.emit(checked);
  }
}
