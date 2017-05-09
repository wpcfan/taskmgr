import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';

import { QuoteService } from '../services';
import * as actions from '../actions/quote.action';

@Injectable()
export class QuoteEffects{
  /**
   * 
   * @param actions$ 
   * @param authService 
   */
  constructor(private actions$: Actions, private quoteService: QuoteService) { }

  /**
   * 
   */
  @Effect()
  quote$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.QUOTE)
    .map(toPayload)
    .switchMap(() => this.quoteService
      .getQuote()
      .catch(err => of(new actions.QuoteFailAction(JSON.stringify(err))).mapTo(undefined)))
    .map(quote => new actions.QuoteSuccessAction(quote))
    ;

}