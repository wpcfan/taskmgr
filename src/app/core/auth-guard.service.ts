import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Router,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot }    from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { AppState } from '../domain/entities.interface';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(private router: Router, private store$: Store<AppState>) { }
  /**
   * 
   * @param route 
   * @param state 
   */
  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
    ): Observable<boolean> {
    const url: string = state.url;
    
    return this.store$.select(appState => appState.auth)
      .map(auth => {
        if(auth.err == undefined){
          this.router.navigate(['login']);
          return false;
        }
        return true;
      });
  }
  /**
   * 
   * @param route 
   */
  canLoad(route: Route): Observable<boolean> {
    let url = `/${route.path}`;
    return this.store$.select(appState => appState.auth)
      .map(auth => {
        if(auth.err == undefined){
          this.router.navigate(['login']);
          return false;
        }
        return true;
      });
  }
}
