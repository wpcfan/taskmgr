import {async, inject, TestBed} from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import {BaseResponseOptions, Http, HttpModule, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {AuthService} from './auth.service';
import {User} from '../domain';

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
          provide: HttpClient,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend, BaseResponseOptions]
        },
        MockBackend,
        BaseResponseOptions,
        AuthService
      ]
    }).compileComponents();
  }));

  it('注册后应该返回一个 Observable<Auth>',
    async(inject([AuthService, MockBackend],
      (service: AuthService, mockBackend: MockBackend) => {
        const mockUser: User = {
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
          })));
        });
        service.register(mockUser).subscribe(auth => {
          expect(auth.token).toBeDefined();
          expect(auth.userId).toEqual(mockUser.id);
        });
      })));

});
