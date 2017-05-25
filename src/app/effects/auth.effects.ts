import {Injectable} from '@angular/core';
import {Actions, Effect, toPayload} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {go} from '@ngrx/router-store';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';

import {AuthService} from '../services';
import * as actions from '../actions/auth.action';

@Injectable()
export class AuthEffects {

  /**
   *
   */
  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGIN)
    .map(toPayload)
    .switchMap((val: { email: string, password: string }) => this.authService
      .login(val.email, val.password)
      .map(auth => new actions.LoginSuccessAction(auth))
      .catch(err => of(new actions.LoginFailAction({
        status: 501,
        message: err.message,
        exception: err.stack,
        path: '/login',
        timestamp: new Date()
      })))
    );

  /**
   *
   */
  @Effect()
  register$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.REGISTER)
    .map(toPayload)
    .switchMap((val) => this.authService
      .register(val)
      .map(auth => new actions.RegisterSuccessAction(auth))
      .catch(err => of(new actions.RegisterFailAction(err)))
    );

  @Effect()
  navigateHome$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGIN_SUCCESS)
    .map(() => go(['/projects']));

  @Effect()
  registerAndHome$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.REGISTER_SUCCESS)
    .map(() => go(['/projects']));

  @Effect()
  logout$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGOUT)
    .map(() => go(['/']));
  /**
   *
   * @param actions$
   * @param authService
   */
  constructor(private actions$: Actions, private authService: AuthService) {}
}
