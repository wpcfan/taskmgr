import {Action} from '@ngrx/store';

export const SWITCH_THEME = '[THEME] Switch Theme';

export class SwitchThemeAction implements Action {
  readonly type = SWITCH_THEME;

  constructor(public payload: boolean) {
  }
}

export type Actions
  = SwitchThemeAction;
