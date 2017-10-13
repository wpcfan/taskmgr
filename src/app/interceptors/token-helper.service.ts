import { Injectable, Inject } from '@angular/core';
import { AUTH_OPTIONS } from './auth.token';
import { urlBase64Decode } from '../utils/base64.util'

@Injectable()
export class TokenHelperService {
  tokenGetter: () => string;
  constructor(@Inject(AUTH_OPTIONS) config:any) {
    this.tokenGetter = config.tokenGetter;
  }

  public decodeToken(token: string = this.tokenGetter()): any {
    let parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error('The inspected token doesn\'t appear to be a JWT. Check to make sure it has three parts and see https://jwt.io for more.');
    }

    let decoded = urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token.');
    }

    return JSON.parse(decoded);
  }

  public getTokenExpirationDate(token: string = this.tokenGetter()): Date | null {
    let decoded: any;
    decoded = this.decodeToken(token);

    if (!decoded.hasOwnProperty('exp')) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  public isTokenExpired(token: string = this.tokenGetter(), offsetSeconds?: number): boolean {
    let date = this.getTokenExpirationDate(token);
    offsetSeconds = offsetSeconds || 0;

    if (date === null) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
  }
}
