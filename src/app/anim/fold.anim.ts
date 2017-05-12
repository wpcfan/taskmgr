import { trigger, state, animate, transition, style, group } from '@angular/animations';

export const foldAnim = trigger('fold', [
  state('in', style({transform: 'translateX(0)', opacity: 1})),
  state('out', style({
    transform: 'scale(1)',
    'box-shadow': 'none'
  })),
  state('hover',   style({
    transform: 'scale(1.1)',
    'box-shadow': '3px 3px 5px 6px #ccc'
  })),
  transition('out => hover', animate('100ms ease-in')),
  transition('hover => out', animate('100ms ease-out')),
  transition('void => *', [
    style({width: 50, transform: 'translateX(50px)', opacity: 0}),
    group([
      animate('0.3s 0.1s ease', style({
        transform: 'translateX(0)'
      })),
      animate('0.3s ease', style({
        opacity: 1
      }))
    ])
  ]),
  transition('* => void', [
    group([
      animate('0.3s ease', style({
        transform: 'translateX(50px)'
      })),
      animate('0.3s 0.2s ease', style({
        opacity: 0
      }))
    ])
  ])
]);