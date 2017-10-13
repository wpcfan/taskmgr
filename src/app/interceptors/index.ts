import { NgModule, Optional, SkipSelf, Provider, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { AUTH_OPTIONS } from './auth.token';
import { TokenHelperService } from './token-helper.service';

export interface JwtModuleOptions {
  jwtOptionsProvider?: Provider,
  config: {
    tokenGetter?: () => string | Promise<string> | Observable<string> | null;
    headerName?: string;
    authScheme?: string;
    whitelistedDomains?: Array<string | RegExp>;
    throwNoTokenError?: boolean;
    skipWhenExpired?: boolean;
  }
}

@NgModule({
  declarations: [],
  imports: [ CommonModule ],
  exports: [],
  providers: [],
})
export class InterceptorsModule {
  constructor(@Optional() @SkipSelf() parentModule: InterceptorsModule) {
    if (parentModule) {
      throw new Error('JwtModule is already loaded. It should only be imported in your application\'s main module.');
    }
  }
  static forRoot(options: JwtModuleOptions): ModuleWithProviders {
    return {
      ngModule: InterceptorsModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        },
        options.jwtOptionsProvider ||
        {
          provide: AUTH_OPTIONS,
          useValue: options.config
        },
        TokenHelperService
      ]
    };
  }
}
