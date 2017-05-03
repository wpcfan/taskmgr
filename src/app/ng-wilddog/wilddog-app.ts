import { InjectionToken, } from '@angular/core';
import { WilddogAppConfig } from './interfaces';
import * as wilddog from 'wilddog';

export const WilddogAppConfigToken = new InjectionToken<WilddogAppConfig>('WilddogAppConfigToken');

export class WilddogApp implements wilddog.app.App {
  name: string;
  options: {};
  auth: () => wilddog.auth.Auth;
  sync: () => wilddog.sync.sync;
  delete: () => wilddog.Promise<any>;
}

export function _wilddogAppFactory(config: WilddogAppConfig, appName?: string): WilddogApp {
  try {
    if (appName) {
      return wilddog.initializeApp(config, appName);
    } else {
      return wilddog.initializeApp(config);
    }
  }
  catch (e) {
    return wilddog.app(null);
  }
}
