import {animate, state, style, transition, trigger} from '@angular/animations';

export const dropFromTopAnim = trigger('dropFromTop', [
  state('in', style({transform: 'translateY(0)', opacity: 1})),
  transition(':enter', [// `void => *` 可以写成 `:enter`
    style({transform: 'translateY(-100%)', opacity: 0}),
    animate('600ms 200ms')
  ]),
  transition(':leave', [// `* => void` 可以写成 `:leave`
    animate('300ms', style({opacity: 0}))
  ])
]);
