import { Injectable } from '@angular/core';
import {
  CanActivate,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

@Injectable()
export class AuthGuardService implements CanActivate {

  /**
   * 构造函数用于注入服务的依赖以及进行必要的初始化
   * 
   * @param router 路由注入，用于导航处理
   * @param store$ redux store注入，用于状态管理
   */
  constructor(private store$: Store<fromRoot.State>) { }

  /**
   * 用于判断是否可以激活该路由
   * 
   * @param route 
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store$.select(fromRoot.getAuth)
      .map(auth => {
        if(auth.user === undefined || auth.err !== undefined){
          return false;
        }
        return true;
      });
  }
}
