import { trigger, state, animate, transition, style } from '@angular/animations';

export const dropFromTopAnim = trigger('dropFromTop', [
  state('in', style({transform: 'translateY(0)'})),
  transition(':enter', [// `void => *` 可以写成 `:enter`
    style({transform: 'translateY(-100%)'}),
    animate('300ms')
  ]),
  transition(':leave', [// `void => *` 可以写成 `:leave`
    animate('0.3s 0 ease', style({
      opacity: 0.4
    }))
  ])
]);
