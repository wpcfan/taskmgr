import {Action} from '@ngrx/store';
import {Err, Quote} from '../domain';

export const QUOTE = '[Quote] Quote';
export const QUOTE_SUCCESS = '[Quote] Quote Success';
export const QUOTE_FAIL = '[Quote] Quote Fail';

export class QuoteAction implements Action {
  readonly type = QUOTE;
}

export class QuoteSuccessAction implements Action {
  readonly type = QUOTE_SUCCESS;

  constructor(public payload: Quote) {
  }
}

export class QuoteFailAction implements Action {
  readonly type = QUOTE_FAIL;

  constructor(public payload: string) {
  }
}


export type Actions
  = QuoteAction
  | QuoteSuccessAction
  | QuoteFailAction;
