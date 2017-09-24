import { Component, Output, EventEmitter, HostListener, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-quick-task',
  template: `
    <mat-form-field class="full-width" [matTooltip]="'回车或者点击右侧图标确认'">
      <input matInput placeholder="在这里快速建立一个任务" [(ngModel)]="desc"/>
      <button mat-icon-button matSuffix (click)="sendQuickTask()">
        <mat-icon>send</mat-icon>
      </button>
    </mat-form-field>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickTaskComponent {

  desc: string;
  @Output() quickTask = new EventEmitter<string>();

  constructor() { }

  @HostListener('keyup.enter')
  sendQuickTask() {
    if (!this.desc || this.desc.length === 0 || !this.desc.trim() || this.desc.length > 20) {
      return;
    }
    this.quickTask.emit(this.desc);
    this.desc = '';
  }
}
