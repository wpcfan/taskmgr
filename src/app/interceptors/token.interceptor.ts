import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { AUTH_OPTIONS } from './auth.token';
import { TokenHelperService } from './token-helper.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  tokenGetter: () => string | Promise<string> | Observable<string>;
  headerName: string;
  authScheme: string;
  whitelistedDomains: Array<string | RegExp>;
  throwNoTokenError: boolean;
  skipWhenExpired: boolean;

  constructor(@Inject(AUTH_OPTIONS) config: any, private tokenHelper: TokenHelperService) {
    this.tokenGetter = config.tokenGetter;
    this.headerName = config.headerName || 'Authorization';
    this.authScheme = config.authScheme ? config.authScheme : 'Bearer ';
    this.whitelistedDomains = config.whitelistedDomains || [];
    this.throwNoTokenError = config.throwNoTokenError || false;
    this.skipWhenExpired = config.skipWhenExpired;
  }

  isWhitelistedDomain(request: HttpRequest<any>): boolean {
    let requestUrl: URL;
    try {
      requestUrl = new URL(request.url);
      return (
        this.whitelistedDomains.findIndex(
          domain =>
            typeof domain === 'string'
              ? domain === requestUrl.host
              : domain instanceof RegExp ? domain.test(requestUrl.host) : false
        ) > -1
      );
    } catch (err) {
      // if we're here, the request is made
      // to the same domain as the Angular app
      // so it's safe to proceed
      return true;
    }
  }

  handleInterception(
    token: string,
    request: HttpRequest<any>,
    next: HttpHandler
  ) {
    let tokenIsExpired = false;

    if (!token && this.throwNoTokenError) {
      throw new Error('Could not get token from tokenGetter function.');
    }

    if (this.skipWhenExpired) {
      tokenIsExpired = token ? this.tokenHelper.isTokenExpired(token) : true;
    }

    if (token && tokenIsExpired && this.skipWhenExpired) {
      request = request.clone();
    } else if (token && this.isWhitelistedDomain(request)) {
      request = request.clone({
        setHeaders: {
          [this.headerName]: `${this.authScheme}${token}`
        }
      });
    }
    return next.handle(request);
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: any = this.tokenGetter();

    if (token instanceof Promise) {
      return Observable.fromPromise(token).mergeMap((asyncToken: string) => {
        return this.handleInterception(asyncToken, req, next);
      });
    } else if (token instanceof Observable) {
      return token.mergeMap((asyncToken: string) => {
        return this.handleInterception(asyncToken, req, next);
      });
    } else {
      return this.handleInterception(token, req, next);
    }
  }
}
