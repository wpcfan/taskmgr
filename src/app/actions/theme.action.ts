import { Action } from '@ngrx/store';
import { type } from '../utils/type.util';


/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 * 
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique. 
 */
export const ActionTypes = {
  SWITCH_THEME:             type('[THEME] Switch Theme'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
export class SwitchThemeAction implements Action {
  type = ActionTypes.SWITCH_THEME;

  constructor(public payload: boolean) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = SwitchThemeAction;