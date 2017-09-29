import {ChangeDetectionStrategy, Component, EventEmitter, Output, Input} from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="onClick()" *ngIf="auth">
        <mat-icon>menu</mat-icon>
      </button>
      <span>企业协作平台</span>
      <span class="fill-remaining-space"></span>
      <mat-slide-toggle (change)="onChange($event.checked)">黑夜模式</mat-slide-toggle>
      <span><a mat-button *ngIf="auth" (click)="handleLogout()">退出</a></span>
    </mat-toolbar>
  `,
  styles: [`
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  @Input() auth = false;
  @Output() toggle = new EventEmitter<void>();
  @Output() toggleDarkTheme = new EventEmitter<boolean>();
  @Output() logout = new EventEmitter();

  onClick() {
    this.toggle.emit();
  }

  handleLogout() {
    this.logout.emit();
  }

  onChange(checked: boolean) {
    this.toggleDarkTheme.emit(checked);
  }
}
