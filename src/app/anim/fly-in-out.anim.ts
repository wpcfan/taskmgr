import { trigger, state, animate, transition, style } from '@angular/animations';

export const flyInOut = trigger('flyInOut', [
  state('in', style({transform: 'translateX(0)'})),
  transition('void => *', [// `void => *` 可以写成 `:enter`
    style({transform: 'translateX(100%)'}),
    animate(300)
  ]),
  transition('* => void', [// `void => *` 可以写成 `:leave`
    animate(300, style({transform: 'translateX(-100%)'}))
  ])
]);
