import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';

import { AuthService } from '../services/auth.service';
import * as authActions from '../actions/auth.action';
import { User, Err } from '../domain/entities.interface';

@Injectable()
export class AuthEffects{
  /**
   * 
   * @param actions$ 
   * @param authService 
   */
  constructor(private actions$: Actions, private authService: AuthService) { }

  /**
   * 
   */
  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.LOGIN)
    .map(toPayload)
    .switchMap((val:{username:string, password: string}) => {
      return this.authService.login(val.username, val.password);
    })
    .map(user => new authActions.LoginSuccessAction({user: user}))
    .catch(err => of(new authActions.LoginFailAction(err.json())));

  /**
   * 
   */
  @Effect()
  register$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.REGISTER)
    .map(toPayload)
    .switchMap((val:User) => {
      return this.authService.register(val);
    })
    .map(user => new authActions.RegisterSuccessAction({user: user}))
    .catch(err => of(new authActions.RegisterFailAction(err.json())));

  @Effect()
  navigateHome$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.LOGIN_SUCCESS)
    .map(() => go(['/todos']));

  @Effect()
  registerAndHome$: Observable<Action> = this.actions$
    .ofType(authActions.ActionTypes.REGISTER_SUCCESS)
    .map(() => go(['/todos']));
}