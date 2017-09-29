import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <img src="assets/img/not-found.png">
  `,
  styles: [`
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {}
