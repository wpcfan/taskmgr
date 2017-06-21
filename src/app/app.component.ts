import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as fromRoot from './reducers';
import * as actions from './actions/theme.action';
import { OverlayContainer } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  dark$: Observable<boolean>;

  constructor(private store$: Store<fromRoot.State>, private oc: OverlayContainer) {
    this.dark$ = this.store$.select(fromRoot.getTheme);
  }

  switchDarkTheme(dark: boolean): void {
    this.store$.dispatch(new actions.SwitchThemeAction(dark));
    this.oc.themeClass = dark ? 'myapp-dark-theme' : null;
  }
}
