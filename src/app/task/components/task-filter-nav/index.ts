import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-filter-nav',
  templateUrl: './task-filter-nav.component.html',
  styleUrls: ['./task-filter-nav.component.scss']
})
export class TaskFilterNavComponent implements OnInit {

  @Output() closeClicked = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onCloseClicked(ev: Event) {
    ev.preventDefault();
    this.closeClicked.emit();
  }

}
