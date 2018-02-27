import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';
import {QuoteService} from '../services';
import * as actions from '../actions/quote.action';

@Injectable()
export class QuoteEffects {
  /**
   *
   */
  @Effect()
  quote$: Observable<Action> = this.actions$
    .pipe(
      ofType<actions.QuoteAction>(actions.QUOTE),
      switchMap(() => this.quoteService.getQuote()
        .pipe(
          map(quote => new actions.QuoteSuccessAction(quote)),
          catchError(err => of(new actions.QuoteFailAction(JSON.stringify(err))))
        )
      )
    );

  /**
   *
   * @param actions$
   * @param quoteService
   */
  constructor(private actions$: Actions, private quoteService: QuoteService) {}
}
