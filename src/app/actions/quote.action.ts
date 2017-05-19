import { Action } from '@ngrx/store';
import { type } from '../utils/type.util';
import { Quote, Err } from '../domain';

export const ActionTypes = {
  QUOTE:             type('[Quote] Quote'),
  QUOTE_SUCCESS:     type('[Quote] Quote Success'),
  QUOTE_FAIL:        type('[Quote] Quote Fail')
};

export class QuoteAction implements Action {
  type = ActionTypes.QUOTE;
  constructor(public payload: any){}
}

export class QuoteSuccessAction implements Action {
  type = ActionTypes.QUOTE_SUCCESS;
  constructor(public payload: Quote){}
}

export class QuoteFailAction implements Action {
  type = ActionTypes.QUOTE_FAIL;
  constructor(public payload: Err){}
}


export type Actions
  = QuoteAction
  | QuoteSuccessAction
  | QuoteFailAction;