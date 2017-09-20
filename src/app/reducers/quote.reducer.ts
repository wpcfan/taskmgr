import {Quote} from '../domain';
import * as actions from '../actions/quote.action';

export const initialState: Quote = {
  cn: '满足感在于不断的努力，而不是现有成就。全心努力定会胜利满满。',
  en: 'Satisfaction lies in the effort, not in the attainment. Full effort is full victory. ',
  pic: 'assets/img/quote_fallback.jpg',
};

export function reducer(state: Quote = initialState, action: actions.Actions): Quote {
  switch (action.type) {
    case actions.QUOTE_SUCCESS:
      return {...action.payload};
    case actions.QUOTE_FAIL:
    default:
      return state;
  }
}
