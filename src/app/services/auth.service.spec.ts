import { TestBed, inject, async } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  BaseResponseOptions,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { AuthService } from './auth.service';
import * as models from "../domain";

describe('测试鉴权服务：AuthService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {
          provide: 'BASE_CONFIG',
          useValue: {
            uri: 'https://leancloud.cn/1.1',
            LCId: 'ABTVy9loYSaIMc3EkaFRupTL-gzGzoHsz',
            LCKey: 'mwywiweRadXf6CztkUNyUsPS'
          }
        },
        { 
          provide: Http, 
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend, BaseResponseOptions] 
        },
        MockBackend,
        BaseResponseOptions,
        AuthService
      ]
    }).compileComponents();;
  }));

  it('注册后应该返回一个 Observable<Auth>', 
    async(inject([AuthService, MockBackend], 
      (service: AuthService, mockBackend: MockBackend) => {
    const mockUser: models.User = {
      name: 'someuser@dev.local',
      password: '123abc',
      email: 'someuser@dev.local'
    };
    const mockResponse = {
      id: 'obj123abc',
      name: 'someuser@dev.local',
      email: 'someuser@dev.local',
      password: '123abc'
    };
    mockBackend.connections.subscribe(conn => {
      conn.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })))
    });
    service.register(mockUser).subscribe(auth => {
      expect(auth.token).toBeDefined();
      expect(auth.user.email).toEqual(mockUser.email);
    });
  })));

});
