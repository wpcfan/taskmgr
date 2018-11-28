import { async, inject, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { User } from '../domain';

describe('测试鉴权服务：AuthService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
  }));

  afterEach(inject(
    [HttpTestingController],
    (backend: HttpTestingController) => {
      backend.verify();
    }
  ));

  it('注册后应该返回一个 Observable<Auth>', async(
    inject(
      [AuthService, HttpTestingController],
      (service: AuthService, mockBackend: HttpTestingController) => {
        const mockUser: User = {
          id: undefined,
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
        service.register(mockUser).subscribe(auth => {
          expect(auth.token).toBeDefined();
          expect(auth.userId).toEqual(mockUser.id);
        });

        mockBackend
          .expectOne('users')
          .flush(JSON.stringify(mockResponse), {
            status: 200,
            statusText: 'Ok'
          });
      }
    )
  ));
});
