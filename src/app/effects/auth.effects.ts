import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import { Router } from '@angular/router';
import * as routerActions from '../actions/router.action';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import {getAuth} from '../utils/auth.util';
import {AuthService} from '../services';
import * as actions from '../actions/auth.action';

@Injectable()
export class AuthEffects {

  @Effect()
  init$: Observable<Action> = Observable.defer(() => {
    const loggedIn = getAuth();
    if(loggedIn) {

    }
    return
  });

  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType<actions.LoginAction>(actions.LOGIN)
    .map((action: actions.LoginAction) => action.payload)
    .switchMap((val: { username: string, password: string }) => this.authService
      .login(val.username, val.password)
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
    .ofType<actions.RegisterAction>(actions.REGISTER)
    .map(action => action.payload)
    .switchMap((val) => this.authService
      .register(val)
      .map(auth => new actions.RegisterSuccessAction(auth))
      .catch(err => of(new actions.RegisterFailAction(err)))
    );

  @Effect()
  navigateHome$: Observable<Action> = this.actions$
    .ofType<actions.LoginSuccessAction>(actions.LOGIN_SUCCESS)
    .map(() => new routerActions.Go({path: ['/projects']}))
    ;

  @Effect()
  registerAndHome$: Observable<Action> = this.actions$
    .ofType<actions.RegisterSuccessAction>(actions.REGISTER_SUCCESS)
    .map(() => new routerActions.Go({path: ['/projects']}));

  @Effect()
  logout$: Observable<Action> = this.actions$
    .ofType<actions.LogoutAction>(actions.LOGOUT)
    .map(() => new routerActions.Go({path: ['/']}))
    .do(_ => localStorage.clear());

  @Effect({ dispatch: false })
  navigate$ = this.actions$.ofType(routerActions.GO)
    .map((action: routerActions.Go) => action.payload)
    .do(({ path, query: queryParams, extras}) =>
      this.router.navigate(path, { queryParams, ...extras }));


  @Effect({ dispatch: false })
  loginAndStoreToken$ = this.actions$
    .ofType<actions.LoginSuccessAction>(actions.LOGIN_SUCCESS)
    .map(action => action.payload)
    .do(auth => localStorage.setItem('access_token', <string>auth.token))

  @Effect({ dispatch: false })
  registerAndStoreToken$ = this.actions$
    .ofType<actions.RegisterSuccessAction>(actions.REGISTER_SUCCESS)
    .map(action => action.payload)
    .do(auth => localStorage.setItem('access_token', <string>auth.token))

  /**
   *
   * @param actions$
   * @param authService
   */
  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService) {}
}
