import {animate, state, style, transition, trigger} from '@angular/animations';

export enum RouterAnimType {
  Right = 0,
  Left,
  Bottom,
  Top
}

export const routerAnim = (animType: RouterAnimType) => {
  switch (animType) {
    case RouterAnimType.Right: {
      return slideToRight();
    }
    case RouterAnimType.Left: {
      return slideToLeft();
    }
    case RouterAnimType.Bottom: {
      return slideToBottom();
    }
    case RouterAnimType.Top: {
      return slideToTop();
    }
    default: {
      return slideToBottom();
    }
  }
};

const slideToRight = () => {
  return trigger('routeAnim', [
    state('void', style({position:'fixed', width:'100%'}) ),
    state('*', style({position:'fixed', width:'100%'}) ),
    transition(':enter', [
      style({transform: 'translateX(-100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(100%)'}))
    ])
  ]);
}

const slideToLeft = () => {
  return trigger('routeAnim', [
    state('void', style({position:'fixed', width:'100%'}) ),
    state('*', style({position:'fixed', width:'100%'}) ),
    transition(':enter', [
      style({transform: 'translateX(100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
    ])
  ]);
}

const slideToBottom = () => {
  return trigger('routeAnim', [
    state('void', style({position:'fixed', width:'100%', height:'80%'}) ),
    state('*', style({position:'fixed', width:'100%', height:'80%'}) ),
    transition(':enter', [
      style({transform: 'translateY(-100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateY(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(100%)'}))
    ])
  ]);
}

const slideToTop = () => {
  return trigger('routeAnim', [
    state('void', style({position:'fixed', width:'100%', height:'100%'}) ),
    state('*', style({position:'fixed', width:'100%', height:'100%'}) ),
    transition(':enter', [
      style({transform: 'translateY(100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateY(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(-100%)'}))
    ])
  ]);
}
