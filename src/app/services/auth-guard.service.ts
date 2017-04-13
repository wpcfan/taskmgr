import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot }    from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import * as fromRoot from '../reducers'

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {

  /**
   * 构造函数用于注入服务的依赖以及进行必要的初始化
   * 
   * @param router 路由注入，用于导航处理
   * @param store$ redux store注入，用于状态管理
   */
  constructor(private store$: Store<fromRoot.State>) { }

  /**
   * 用于判断是否可以激活改路由
   * 
   * @param route 
   * @param state 
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const url: string = state.url;
    console.log('canActivate: ' + url);
    return this.store$.select(fromRoot.getAuth)
      .map(auth => {
        if(auth.user === undefined || auth.err !== undefined){
          this.store$.dispatch(go(['/login']));
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
    const url = `/${route.path}`;
    console.log('canLoad: '+ url);
    return this.store$.select(fromRoot.getAuth)
      .map(auth => {
        if(auth.user === undefined || auth.err !== undefined){
          this.store$.dispatch(go(['/login']));
          return false;
        }
        return true;
      });
  }
}
