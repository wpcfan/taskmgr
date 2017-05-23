import { Injectable } from '@angular/core';
import {
  CanActivate,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/defaultIfEmpty';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store } from '@ngrx/store';
import { go } from "@ngrx/router-store";
import { Actions } from "@ngrx/effects";
import * as fromRoot from '../reducers';
import * as actions from '../actions/auth.action';

@Injectable()
export class AuthGuardService implements CanActivate {
  private _authSubject: BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);
  /**
   * 构造函数用于注入服务的依赖以及进行必要的初始化
   * 
   * @param router 路由注入，用于导航处理
   * @param store$ redux store注入，用于状态管理
   */
  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>) { 
      this.store$
        .select(s => s.auth)
        .subscribe(auth => {
          const result = (auth.user !== undefined);
          this._authSubject.next(result);
          if(!result) this.store$.dispatch(go(['/login']));
        });
    }

  /**
   * 用于判断是否可以激活该路由
   * 
   * @param route 
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkAuth();
  }

  checkAuth(): Observable<boolean>{
    return this._authSubject.asObservable();
  }
}
