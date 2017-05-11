import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot 
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import * as fromRoot from '../reducers';
import { Actions, toPayload } from '@ngrx/effects';
import * as actions from '../actions/auth.action';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {

  /**
   * 构造函数用于注入服务的依赖以及进行必要的初始化
   * 
   * @param router 路由注入，用于导航处理
   * @param store$ redux store注入，用于状态管理
   */
  constructor(private actions$: Actions, private store$: Store<fromRoot.State>) { }

  /**
   * 用于判断是否可以激活该路由
   * 
   * @param route 
   * @param state 
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const url: string = state.url;
    return this.store$.select(fromRoot.getAuth)
      .map(auth => {
        console.log(auth.user === undefined || auth.err !== undefined)
        if(auth.user === undefined || auth.err !== undefined){
          return false;
        }
        return true;
      })
      .take(1)
      .takeUntil(this.actions$.ofType(actions.ActionTypes.LOGIN_FAIL));
  }

  /**
   * 用于判断路由是否可以加载，一般用于阻止直接的 URL 访问
   * @param route 
   */
  canLoad(route: Route): Observable<boolean> {
    const url = `/${route.path}`;
    return this.store$.select(fromRoot.getAuth)
      .map(auth => {
        if(auth.user === undefined || auth.err !== undefined){
          return false;
        }
        return true;
      });
  }
}
