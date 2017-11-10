import { Component, OnInit, Input, HostListener } from '@angular/core';
import { priorityAnim } from '../../../anim';
import { TaskVM } from '../../../vm';
import {
  getOwnerAvatar,
  getDueDateDesc,
  isPastDate,
  isTodayDate,
  isFutureDate
} from '../../../utils/project-menu.util';

@Component({
  selector: 'app-task-list-dialog-item',
  templateUrl: './task-list-dialog-item.component.html',
  styleUrls: ['./task-list-dialog.component.scss'],
  animations: [priorityAnim]
})
export class TaskListDialogItemComponent implements OnInit {

  @Input() taskVM: TaskVM;

  animState = 'out';

  constructor() {
  }

  ngOnInit() {

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

  @HostListener('mouseenter')
  handleMouseEnter() {
    this.animState = 'in';
  }

  @HostListener('mouseleave')
  handleMouseLeave() {
    this.animState = 'out';
  }
}
