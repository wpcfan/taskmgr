import { Inject, Injectable } from '@angular/core';
import { WilddogAppConfigToken, WilddogApp } from './wilddog-app';
import { WilddogListFactory } from './wilddog-list-factory';
import { WilddogListObservable } from './wilddog-list-observable';
import { 
  WilddogListFactoryOpts, 
  WilddogObjectFactoryOpts, 
  PathReference 
} from './interfaces';
import { WilddogObjectFactory } from './wilddog-object-factory';
import { WilddogObjectObservable } from './wilddog-object-observable';
import * as utils from './wilddog.util';

@Injectable()
export class NgWilddogDatabase {

  constructor(public app: WilddogApp) {}

  list(pathOrRef: PathReference, opts?:WilddogListFactoryOpts):WilddogListObservable<any[]> {
    const ref = utils.getRef(this.app, pathOrRef);
    return WilddogListFactory(ref, opts);
  }

  object(pathOrRef: PathReference, opts?:WilddogObjectFactoryOpts):WilddogObjectObservable<any> {
    const ref = utils.getRef(this.app, pathOrRef);
    return WilddogObjectFactory(ref, opts);
  }

}
