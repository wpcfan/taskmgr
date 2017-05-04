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
    .switchMap((val:{email:string, password: string}) => {
      return this.authService.login(val.email, val.password);
    })
    .map(auth => new actions.LoginSuccessAction(auth))
    .catch(err => of(new actions.LoginFailAction(err)));

  /**
   * 
   */
  @Effect()
  register$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.REGISTER)
    .map(toPayload)
    .switchMap((val) => this.authService.register(val))
    .map(auth => new actions.RegisterSuccessAction(auth))
    .catch(err => of(new actions.RegisterFailAction(err)));

  @Effect()
  navigateHome$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGIN_SUCCESS)
    .map(() => go(['/projects']));

  @Effect()
  registerAndHome$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.REGISTER_SUCCESS)
    .map(() => go(['/todos']));
  
  @Effect()
  logout$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGOUT)
    .map(() => go(['/login']));
}