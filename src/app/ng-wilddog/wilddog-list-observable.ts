import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import * as wilddog from 'wilddog';
import * as utils from './wilddog.util';
import { 
  WDUnwrappedDataSnapshot, 
  WilddogOperationCases, 
  QueryReference, 
  DatabaseSnapshot, 
  DatabaseReference 
} from './interfaces';

export type WilddogOperation = string | wilddog.sync.Reference | wilddog.sync.DataSnapshot | WDUnwrappedDataSnapshot;

export class WilddogListObservable<T> extends Observable<T> {
  constructor(public $ref: QueryReference, subscribe?: <R>(subscriber: Subscriber<R>) => Subscription | Function | void) {
    super(subscribe);
  }
  lift<T, R>(operator: Operator<T, R>): Observable<R> {
    const observable = new WilddogListObservable<R>(this.$ref);
    observable.source = this;
    observable.operator = operator;
    observable.$ref = this.$ref;
    return observable;
  }

  push(val:any):wilddog.sync.ThenableReference {
    if(!this.$ref) {
      throw new Error('No ref specified for this Observable!');
    }
    return this.$ref.ref().push(val);
  }

  update(item: WilddogOperation, value: Object): wilddog.Promise<void> {
    return this._checkOperationCases(item, {
      stringCase: () => this.$ref.ref().child(<string>item).update(value),
      wilddogCase: () => (<wilddog.sync.Reference>item).update(value),
      snapshotCase: () => (<wilddog.sync.DataSnapshot>item).ref().update(value),
      unwrappedSnapshotCase: () => this.$ref.ref().child((<WDUnwrappedDataSnapshot>item).$key).update(value)
    });
  }

  remove(item?:WilddogOperation): wilddog.Promise<void> {
    // if no item parameter is provided, remove the whole list
    if (!item) {
      return this.$ref.ref().remove();
    }
    return this._checkOperationCases(item, {
      stringCase: () => this.$ref.ref().child(<string>item).remove(),
      wilddogCase: () => (<DatabaseReference>item).remove(),
      snapshotCase: () => (<DatabaseSnapshot>item).ref().remove(),
      unwrappedSnapshotCase: () => this.$ref.ref().child((<WDUnwrappedDataSnapshot>item).$key).remove()
    });
  }

  _checkOperationCases(item: WilddogOperation, cases: WilddogOperationCases) : wilddog.Promise<void> {
    if (utils.isString(item)) {
      return cases.stringCase();
    } else if (utils.isWilddogRef(item)) {
      return cases.wilddogCase();
    } else if (utils.isWilddogDataSnapshot(item)) {
      return cases.snapshotCase();
    } else if (utils.isAFUnwrappedSnapshot(item)) {
      return cases.unwrappedSnapshotCase()
    }
    throw new Error(`Method requires a key, snapshot, reference, or unwrapped snapshot. Got: ${typeof item}`);
  }

}
