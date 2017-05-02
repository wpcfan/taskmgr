import { TestBed, inject } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { Store, provideStore } from "@ngrx/store";
import * as fromRoot from '../reducers';

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardService, provideStore(Store)]
    });
  });

  it('should ...', inject([AuthGuardService, provideStore(Store)], (service: AuthGuardService, store$: Store<fromRoot.State>) => {
    expect(service).toBeTruthy();
  }));
});
