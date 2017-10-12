import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-filter-nav',
  templateUrl: './task-filter-nav.component.html',
  styleUrls: ['./task-filter-nav.component.scss']
})
export class TaskFilterNavComponent implements OnInit {

  @Output() closeClicked = new EventEmitter<void>();

  priorities: { label: string; value: number }[] = [
    {
      label: '普通',
      value: 3
    },
    {
      label: '重要',
      value: 2
    },
    {
      label: '紧急',
      value: 1
    },
  ];

  constructor() { }

  ngOnInit() {
  }

  onCloseClicked(ev: Event) {
    ev.preventDefault();
    this.closeClicked.emit();
  }

}
