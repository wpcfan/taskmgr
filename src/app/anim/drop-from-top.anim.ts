import {animate, state, style, transition, trigger} from '@angular/animations';

export const dropFromTopAnim = trigger('dropFromTop', [
  state('in', style({transform: 'translateX(0)', opacity: 1})),
  transition(':enter', [// `void => *` 可以写成 `:enter`
    style({transform: 'translateX(-100%)', opacity: 0}),
    animate('600ms 200ms')
  ])
]);
