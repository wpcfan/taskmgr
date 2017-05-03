import * as wilddog from 'wilddog';
import * as utils from './wilddog.util';
import { 
  WilddogAppConfigToken, 
  WilddogApp, 
  _wilddogAppFactory 
} from './wilddog-app';
import { 
  WilddogListFactoryOpts, 
  WilddogObjectFactoryOpts, 
  WilddogAppConfig 
} from './interfaces';
import { 
  Injectable, 
  InjectionToken, 
  OpaqueToken, 
  NgModule 
} from '@angular/core';

const WilddogAppName = new InjectionToken<string>('WilddogAppName');

export const WilddogAppProvider = {
  provide: WilddogApp,
  useFactory: _wilddogAppFactory,
  deps: [ WilddogAppConfigToken, WilddogAppName ]
};

@NgModule({
  providers: [ WilddogAppProvider ],
})
export class NgWilddogModule {
  static initializeApp(config: WilddogAppConfig, appName?: string) {
    return {
      ngModule: NgWilddogModule,
      providers: [
        { provide: WilddogAppConfigToken, useValue: config },
        { provide: WilddogAppName, useValue: appName }
      ]
    }
  }
}

export { WilddogApp, WilddogAppName, WilddogAppConfigToken, WilddogAppConfig };
