import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';

import { AuthService } from '../services/auth.service';
import * as actions from '../actions/auth.action';

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
    .ofType(actions.ActionTypes.LOGIN)
    .map(toPayload)
    .switchMap((val:{username:string, password: string}) => {
      return this.authService.login(val.username, val.password);
    })
    .map(user => new actions.LoginSuccessAction({user: user}))
    .catch(err => of(new actions.LoginFailAction(err.json())));

  /**
   * 
   */
  @Effect()
  register$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.REGISTER)
    .map(toPayload)
    .switchMap((val) => {
      return this.authService.register(val);
    })
    .map(user => new actions.RegisterSuccessAction({user: user}))
    .catch(err => of(new actions.RegisterFailAction(err.json())));

  @Effect()
  navigateHome$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGIN_SUCCESS)
    .map(() => go(['/todos']));

  @Effect()
  registerAndHome$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.REGISTER_SUCCESS)
    .map(() => go(['/todos']));
  
  @Effect()
  logout$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGOUT)
    .map(() => go(['/login']));
}