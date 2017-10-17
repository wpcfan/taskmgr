import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { getTaskFilterVM } from '../../../utils/task-filter.util';

@Component({
  selector: 'app-task-filter-nav',
  templateUrl: './task-filter-nav.component.html',
  styleUrls: ['./task-filter-nav.component.scss']
})
export class TaskFilterNavComponent implements OnInit {

  @Output() closeClicked = new EventEmitter<void>();

  priorities: { label: string; value: number; checked: boolean }[] = [
    {
      label: '普通',
      value: 3,
      checked: true,
    },
    {
      label: '重要',
      value: 2,
      checked: false,
    },
    {
      label: '紧急',
      value: 1,
      checked: true,
    },
  ];

  constructor() { }

  ngOnInit() {
    console.log('<<Filter>>', JSON.stringify(getTaskFilterVM({ title: '', priorities: [1] })));
  }

  onCloseClicked(ev: Event) {
    ev.preventDefault();
    this.closeClicked.emit();
  }

  onPriorityItemClicked(ev: Event, priority: { label: string; value: number; checked: boolean }) {
    priority.checked = !priority.checked;
  }
}
