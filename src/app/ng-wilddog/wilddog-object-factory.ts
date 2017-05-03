import { WilddogObjectObservable } from './wilddog-object-observable';
import { Observer } from 'rxjs/Observer';
import { observeOn } from 'rxjs/operator/observeOn';
import * as wilddog from 'wilddog';
import * as utils from './wilddog.util';
import { WilddogObjectFactoryOpts, DatabaseReference } from './interfaces';
import { Zone } from "zone.js/dist/zone";

export function WilddogObjectFactory (
  ref: DatabaseReference,
  { preserveSnapshot }: WilddogObjectFactoryOpts = {}): WilddogObjectObservable<any> {

  const objectObservable = new WilddogObjectObservable((obs: Observer<any>) => {
    let fn = ref.on('value', (snapshot: wilddog.sync.DataSnapshot) => {
      obs.next(preserveSnapshot ? snapshot : utils.unwrapMapFn(snapshot))
    }, err => {
      if (err) { obs.error(err); obs.complete(); }
    });

    return () => ref.off('value', fn);
  }, ref);

  // TODO: should be in the subscription zone instead
  return observeOn.call(objectObservable, new utils.ZoneScheduler(Zone.current));
}
