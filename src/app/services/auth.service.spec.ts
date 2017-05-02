import { TestBed, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        AuthService, 
        {provide: 'BASE_URI', useValue: 'http://localhost:8090'},
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should ...', inject([AuthService, MockBackend], (service: AuthService, mockBackend: XHRBackend) => {
    expect(service).toBeTruthy();
  }));
});
