import { trigger, state, transition, style, animate } from '@angular/animations';

export const itemAnim = trigger('item', [
  state('in', style({'border-left-width': '3px'})),
  state('out', style({'border-left-width': '8px'})),
  transition('out => in', animate('500ms ease-in')),
  transition('in => out', animate('500ms ease-out'))
]);

