import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { priorityAnim } from '../../../anim';
import { TaskVM } from '../../../vm';
import {
  getOwnerAvatar,
  getDueDateDesc,
  isPastDate,
  isTodayDate,
  isFutureDate
} from '../../../utils/project-menu.util';
import * as fromRoot from '../../../reducers';

@Component({
  selector: 'app-task-list-dialog-item',
  templateUrl: './task-list-dialog-item.component.html',
  styleUrls: ['./task-list-dialog-item.component.scss'],
  animations: [priorityAnim]
})
export class TaskListDialogItemComponent implements OnInit, OnDestroy {

  @Input() taskVM: TaskVM;
  @Output() taskComplete = new EventEmitter<void>();
  @Output() itemClicked = new EventEmitter<void>();

  animState = 'out';

  classItem: string = 'task-list-item';
  classItemAvatar: string = 'task-list-item-avatar';

  private theme$: Observable<boolean>;
  private _themeSub: Subscription;

  constructor(private store$: Store<fromRoot.State>) {
    this.theme$ = this.store$.select(fromRoot.getTheme);
  }

  ngOnInit() {
    this._themeSub = this.theme$.subscribe((dark: boolean) => {
      this.switchTheme(dark);
    })
  }

  ngOnDestroy() {
    if (this._themeSub) {
      this._themeSub.unsubscribe();
    }
  }

  switchTheme(dark: boolean) {
    if (!dark) {
      this.classItem = 'task-list-item';
      this.classItemAvatar = 'task-list-item-avatar';
    }
    else {
      this.classItem = 'task-list-item-dark';
      this.classItemAvatar = 'task-list-item-avatar-dark';
    }
  }

  getOwnerAvatar(taskVM: TaskVM) {
    return getOwnerAvatar(taskVM);
  }

  getDateDesc(date: Date): string {
    return getDueDateDesc(date);
  }

  isPastDate(date: Date): boolean {
    return isPastDate(date);
  }

  isTodayDate(date: Date): boolean {
    return isTodayDate(date);
  }

  isFutureDate(date: Date): boolean {
    return isFutureDate(date);
  }

  onCheckboxClicked(ev: Event) {
    ev.stopPropagation();
    this.taskComplete.emit();
  }

  onItemClicked(ev: Event) {
    ev.preventDefault();
    this.itemClicked.emit();
  }

  @HostListener('mouseenter')
  handleMouseEnter() {
    this.animState = 'in';
  }

  @HostListener('mouseleave')
  handleMouseLeave() {
    this.animState = 'out';
  }
}
