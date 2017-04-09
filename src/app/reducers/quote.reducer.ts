import { Reducer, Action } from '@ngrx/store';
import * as entities from '../domain';
import * as actions from '../actions/quote.action';

export interface State{
  quote: entities.Quote;
}

const initialState: State = {
  quote: {
    cn: '满足感在于不断的努力，而不是现有成就。全心努力定会胜利满满。',
    en: 'Satisfaction lies in the effort, not in the attainment. Full effort is full victory. ',
    pic: 'assets/quote_fallback.jpg',
    picSquare: 'assets/quote_thumb_fallback.jpg'
  }
}

export function reducer (state: State = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.ActionTypes.QUOTE_SUCCESS:
      return Object.assign({}, state, {quote: action.payload});
    case actions.ActionTypes.QUOTE_FAIL:
    default:
      return state;
  }
}

export const getQuote = (state: State) => state.quote;