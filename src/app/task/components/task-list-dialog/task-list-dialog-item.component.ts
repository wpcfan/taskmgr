import { Component, OnInit, Input } from '@angular/core';
import { TaskVM } from '../../../vm';
import {
  getDueDateDesc,
  isPastDate,
  isTodayDate,
  isFutureDate
} from '../../../utils/project-menu.util';

@Component({
  selector: 'app-task-list-dialog-item',
  templateUrl: './task-list-dialog-item.component.html',
  styleUrls: ['./task-list-dialog.component.scss']
})
export class TaskListDialogItemComponent implements OnInit {

  @Input() taskVM: TaskVM;

  constructor() {
  }

  ngOnInit() {

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
}
