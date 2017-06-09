import {animate, state, style, transition, trigger} from '@angular/animations';

export enum routeAnimType {
  slideToRight = 0,
  slideToLeft,
  slideToTop,
  slideToBottom
}

export const routeAnimation = (animType: routeAnimType) => {
  switch (animType) {
    case routeAnimType.slideToRight: {
      return slideToRight;
    }
    case routeAnimType.slideToLeft: {
      return slideToLeft;
    }
    case routeAnimType.slideToTop: {
      return slideToTop;
    }
    case routeAnimType.slideToBottom: {
      return slideToBottom;
    }
    default: {
      return slideToBottom;
    }
  }
}

export const slideToRight = trigger('routeAnim', [
  state('void', style({position: 'fixed', width: '100%'}) ),
  state('*', style({position: 'fixed', width: '100%'}) ),
  transition(':enter', [
    style({transform: 'translateX(-100%)'}),
    animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
  ]),
  transition(':leave', [
    style({transform: 'translateX(0%)'}),
    animate('0.5s ease-in-out', style({transform: 'translateX(100%)'}))
  ])
]);

export const slideToLeft = trigger('routeAnim', [
  state('void', style({position: 'fixed', width: '100%'}) ),
  state('*', style({position: 'fixed', width: '100%'}) ),
  transition(':enter', [
    style({transform: 'translateX(100%)'}),
    animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
  ]),
  transition(':leave', [
    style({transform: 'translateX(0%)'}),
    animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
  ])
]);

export const slideToBottom = trigger('routeAnim', [
  state('void', style({position: 'fixed', width: '100%', height: '80%'}) ),
  state('*', style({position: 'fixed', width: '100%', height: '80%'}) ),
  transition(':enter', [
    style({transform: 'translateY(-100%)'}),
    animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
  ]),
  transition(':leave', [
    style({transform: 'translateY(0%)'}),
    animate('0.5s ease-in-out', style({transform: 'translateY(100%)'}))
  ])
]);

export const slideToTop = trigger('routeAnim', [
  state('void', style({position: 'fixed', width: '100%', height: '100%'}) ),
  state('*', style({position: 'fixed', width: '100%', height: '100%'}) ),
  transition(':enter', [
    style({transform: 'translateY(100%)'}),
    animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
  ]),
  transition(':leave', [
    style({transform: 'translateY(0%)'}),
    animate('0.5s ease-in-out', style({transform: 'translateY(-100%)'}))
  ])
]);

