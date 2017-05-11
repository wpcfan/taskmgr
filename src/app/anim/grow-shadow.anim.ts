import { trigger, state, animate, transition, style } from '@angular/animations';

export const growShadowAnim = trigger('growShadow', [
  state('in', style({
    transform: 'scale(1)',
    'box-shadow': 'none'
  })),
  state('hover',   style({
    transform: 'scale(1.1)',
    'box-shadow': '3px 3px 5px 6px #ccc'
  })),
  transition('in => hover', animate('100ms ease-in')),
  transition('hover => in', animate('100ms ease-out')),
]);
