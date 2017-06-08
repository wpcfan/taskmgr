import {Action} from '@ngrx/store';
import {type} from '../utils/type.util';

export const ActionTypes = {
  SWITCH_THEME: type('[THEME] Switch Theme'),
};

export class SwitchThemeAction implements Action {
  type = ActionTypes.SWITCH_THEME;

  constructor(public payload: boolean) {
  }
}

export type Actions
  = SwitchThemeAction;
