import { Component } from '@angular/core';
import { 
  TestBed, 
  inject, 
  async 
} from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Route
} from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import { AuthGuardService } from './auth-guard.service';
import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import { reducer, State, getAuth } from '../reducers';
import * as authActions from '../actions/auth.action'

let mockSnapshot:any = jasmine.createSpyObj<RouterStateSnapshot>("RouterStateSnapshot", ['toString']);

@Component({
  template: '<router-outlet></router-outlet>'
})
class RoutingComponent { }

@Component({
  template: ''
})
class DummyComponent { }


describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'route1', component: DummyComponent},
          {path: 'route2', component: DummyComponent},
        ]),
        StoreModule.provideStore(reducer),
      ],
      declarations: [DummyComponent, RoutingComponent],
      providers: [
        AuthGuardService,
        {provide: RouterStateSnapshot, useValue: mockSnapshot}
      ]
    });
  });

  it('should not allow user to get around guard', 
    inject([AuthGuardService, Store], 
      (service: AuthGuardService, store$: Store<State>) => {
    let fixture = TestBed.createComponent(RoutingComponent);
    const guard$ = service.canActivate(new ActivatedRouteSnapshot(), mockSnapshot);
    const auth$ = store$.select(getAuth);
    const merge$ = guard$.withLatestFrom(
      auth$, (g, a) => Object.assign({}, {result: g, auth: a.err===undefined && a.user !== undefined}))
    merge$.subscribe(r => {
      expect(r.result).toBe(r.auth);
    });
    store$.dispatch({
      type: authActions.ActionTypes.LOGIN_SUCCESS, 
      payload:{
        token: 'xxxx', 
        user: { id: 'xxxx',email: 'abc@dev.local', name: 'xxxx', password: 'sssss'}}});
  }));

});