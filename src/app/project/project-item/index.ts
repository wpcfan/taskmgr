import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output
} from '@angular/core';
import {foldAnim} from '../../anim';

@Component({
  selector: 'app-project-item',
  template: `
    <md-card>
      <md-card-header (click)="onClick($event)">
        <md-card-title>
          <span>
            {{item.name}}
          </span>
        </md-card-title>
      </md-card-header>
      <img md-card-image [src]="item.coverImg" (click)="onClick($event)">
      <md-card-content (click)="onClick($event)">
        <p>{{item.desc}}</p>
      </md-card-content>
      <md-card-actions>
        <button md-button (click)="openUpdateDialog($event)">
          <md-icon>note</md-icon>
          <span>编辑</span>
        </button>
        <button md-button (click)="openInviteDialog($event)">
          <md-icon>group_add</md-icon>
          <span>邀请</span>
        </button>
        <button md-button (click)="openDeleteDialog($event)">
          <md-icon>delete</md-icon>
          <span>删除</span>
        </button>
      </md-card-actions>
    </md-card>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [foldAnim],
})
export class ProjectItemComponent {
  @Input() item;
  @Output() itemSelected = new EventEmitter<void>();
  @Output() launchUpdateDialog = new EventEmitter<void>();
  @Output() launchInviteDailog = new EventEmitter<void>();
  @Output() launchDeleteDailog = new EventEmitter<void>();
  @HostBinding('@fold') fold;

  @HostListener('mouseenter', ['$event.target'])
  onMouseEnter(target) {
    this.fold = 'hover';
  }

  @HostListener('mouseleave', ['$event.target'])
  onMouseLeave(target) {
    this.fold = 'out';
  }

  onClick(ev: Event) {
    ev.preventDefault();
    this.itemSelected.emit();
  }

  openUpdateDialog(ev: Event) {
    ev.preventDefault();
    this.launchUpdateDialog.emit();
  }

  openInviteDialog(ev: Event) {
    ev.preventDefault();
    this.launchInviteDailog.emit();
  }

  openDeleteDialog(ev: Event) {
    ev.preventDefault();
    this.launchDeleteDailog.emit();
  }

  constructor() {}
}
