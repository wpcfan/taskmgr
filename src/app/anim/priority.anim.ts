import { trigger, state, transition, style, animate } from '@angular/animations';

export const priorityAnim = trigger('priority', [
  state('in', style({ 'width': '8px' })),
  state('out', style({ 'width': '3px' })),
  transition('out => in', animate('300ms ease-in')),
  transition('in => out', animate('300ms ease-out'))
]);

