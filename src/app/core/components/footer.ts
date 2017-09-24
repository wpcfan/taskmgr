import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <mat-toolbar color="primary">
      <span class="fill-remaining-space"></span>
      <span>&copy; 2017 版权所有: 接灰的电子产品</span>
      <span class="fill-remaining-space"></span>
    </mat-toolbar>
  `,
  styles: [`
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
