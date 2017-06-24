import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../domain';
import {itemAnim} from '../../anim/item.anim';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [itemAnim]
})
export class TaskItemComponent implements OnInit {

  @Output() taskComplete = new EventEmitter<Task>();
  @Output() taskClick = new EventEmitter<string>();
  @Input() item: Task;
  avatar: string;
  widerPriority = 'in';

  constructor() {
  }

  ngOnInit() {
    this.avatar = (this.item.owner) ? this.item.owner.avatar : 'unassigned';
  }

  onCheckboxClick(ev: Event) {
    ev.stopPropagation();
  }

  checkboxChanged() {
    this.taskComplete.emit(this.item);
  }

  itemClicked(ev: Event) {
    ev.preventDefault();
    this.taskClick.emit(this.item.id);
  }

  @HostListener('mouseenter')
  handleMouseEnter() {
    this.widerPriority = 'out';
  }

  @HostListener('mouseleave')
  handleMouseLeave() {
    this.widerPriority = 'in';
  }

}
