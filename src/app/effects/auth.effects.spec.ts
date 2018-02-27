import { provideMockActions } from '@ngrx/effects/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { hot, cold } from 'jasmine-marbles';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { AuthEffects } from './auth.effects';
import { AuthService } from '../services/auth.service';
import * as actions from '../actions/auth.action';

describe('测试 AuthEffects', () => {
  let effects: AuthEffects;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        AuthEffects,
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('authService', ['login', 'register'])
        },
        provideMockActions(() => actions$),
      ]
    });
    effects = TestBed.get(AuthEffects);
  });

  function setup(methodName: string, params?: { returnedAuth: any }) {
    const authService = TestBed.get(AuthService);
    if (params) {
      if (methodName === 'login') {
        authService.login.and.returnValue(params.returnedAuth);
      } else {
        authService.register.and.returnValue(params.returnedAuth);
      }
    }

    return {
      authEffects: TestBed.get(AuthEffects)
    };
  }

  describe('登录逻辑：login$', () => {
    it('登录成功发送 LoginSuccessAction', fakeAsync(() => {

      const auth = {
        token: '',
        user: {
          id: '123abc',
          name: 'wang',
          email: 'wang@163.com'
        }
      };
      actions$ = hot('--a-', { a: new actions.LoginAction({ email: 'wang@dev.local', password: '123abc' }) });
      const { authEffects } = setup('login', { returnedAuth: of(auth) });

      const expectedResult = cold('--b', { b: new actions.LoginSuccessAction(auth) });
      expect(effects.login$).toBeObservable(expectedResult);
    }));
  });
});
