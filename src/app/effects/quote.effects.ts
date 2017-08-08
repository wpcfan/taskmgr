import {Injectable} from '@angular/core';
import {Actions, Effect, toPayload} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import {QuoteService} from '../services';
import * as actions from '../actions/quote.action';

@Injectable()
export class QuoteEffects {
  /**
   *
   */
  @Effect()
  quote$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.QUOTE)
    .map(toPayload)
    .switchMap(() => this.quoteService
      .getQuote()
      .map(quote => new actions.QuoteSuccessAction(quote))
      .catch(err => of(new actions.QuoteFailAction(JSON.stringify(err))))
    );

  /**
   *
   * @param actions$
   * @param quoteService
   */
  constructor(private actions$: Actions, private quoteService: QuoteService) {}
}
