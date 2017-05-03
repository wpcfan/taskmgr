import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import * as wilddog from 'wilddog';

export class WilddogObjectObservable<T> extends Observable<T> {
  constructor(subscribe?: <R>(subscriber: Subscriber<R>) => Subscription | Function | void, public $ref?:wilddog.sync.Reference) {
    super(subscribe);
  }
  lift<T, R>(operator: Operator<T, R>): Observable<R> {
    const observable = new WilddogObjectObservable<R>();
    observable.source = this;
    observable.operator = operator;
    observable.$ref = this.$ref;
    return observable;
  }
  set(value: any): wilddog.Promise<void> {
    if(!this.$ref) {
      throw new Error('No ref specified for this Observable!');
    }
    return this.$ref.set(value);
  }
  update(value: Object): wilddog.Promise<void> {
    if(!this.$ref) {
      throw new Error('No ref specified for this Observable!');
    }
    return this.$ref.update(value);
  }
  remove(): wilddog.Promise<void> {
    if(!this.$ref) {
      throw new Error('No ref specified for this Observable!');
    }
    return this.$ref.remove();
  }
}
