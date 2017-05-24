import * as actions from '../actions/theme.action';

export interface State {
  darkmode: boolean;
}

export const initialState: State = {
  darkmode: false
};

export function reducer(state = initialState, action: actions.Actions ): State {
  switch (action.type) {
    case actions.ActionTypes.SWITCH_THEME:{
      return Object.assign({}, state, {darkmode: action.payload});
    }
    default: {
      return state;
    }
  }
}

export const getTheme = (state) => state.darkmode;
