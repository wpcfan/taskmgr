import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { TaskHistoryVM } from '../../../vm';

@Component({
  selector: 'app-task-history-dialog-item',
  templateUrl: './task-history-dialog-item.component.html',
  styleUrls: ['./task-history-dialog-item.component.scss']
})
export class TaskHistoryDialogItemComponent implements OnInit {

  @Input() taskHistoryVM: TaskHistoryVM;
  @Output() itemClicked = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onItemClicked(ev: Event) {
    ev.preventDefault();
    this.itemClicked.emit();
  }
}
