import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';

import { QuoteService } from '../services/quote.service';
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
    .switchMap(() => {
      return this.quoteService.getQuote();
    })
    .map(quote => new actions.QuoteSuccessAction(quote))
    .catch(err => of(new actions.QuoteFailAction(err.json())));

}