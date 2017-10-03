import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { TaskHistoryVM } from '../../../vm';

@Component({
  selector: 'app-task-history-item',
  templateUrl: './task-history-item.component.html',
  styleUrls: ['./task-history-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHistoryItemComponent implements OnInit {

  @Input() item: TaskHistoryVM;

  constructor() { }

  ngOnInit() {
  }

}
