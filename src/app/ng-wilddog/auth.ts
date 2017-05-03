import * as wilddog from 'wilddog';
import * as utils from './wilddog.util';
import { Injectable } from '@angular/core';
import { Auth } from './interfaces';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { observeOn } from 'rxjs/operator/observeOn';
import { WilddogApp } from './wilddog-app';
import 'zone.js';

@Injectable()
export class NgWilddogAuth {

  /**
   * Wilddog Auth instance
   */
  auth: wilddog.auth.Auth;

  /**
   * Observable of authentication state
   */
  authState: Observable<wilddog.User>;

  constructor(public app: WilddogApp) {
    this.authState = WilddogAuthStateObservable(app);
    this.auth = app.auth();
  }

}

/**
 * Create an Observable of Wilddog authentication state. Each event is called
 * within the current zone.
 * @param app - Wilddog App instance
 */
export function WilddogAuthStateObservable(app: WilddogApp): Observable<wilddog.User> {
  const authState = Observable.create((observer: Observer<wilddog.User>) => {
    app.auth().onAuthStateChanged(
      (user?: wilddog.User) => observer.next(user),
      (error: wilddog.auth.Error) => observer.error(error),
      () => observer.complete()
    );
  });
  return observeOn.call(authState, new utils.ZoneScheduler(Zone.current));
}
