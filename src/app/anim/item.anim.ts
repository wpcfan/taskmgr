import { trigger, state, transition, style, animate } from '@angular/animations';

export const itemAnim = trigger('item', [
  state('in', style({'border-left-width': '3px'})),
  state('out', style({'border-left-width': '8px'})),
  transition('out => in', animate('200ms ease-in')),
  transition('in => out', animate('200ms ease-out'))
]);

