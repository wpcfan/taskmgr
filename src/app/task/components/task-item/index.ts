import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../../domain';
import {itemAnim} from '../../../anim/item.anim';
import {TaskVM} from '../../../vm/task.vm';

@Component({
  selector: 'app-task-item',
  template: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [itemAnim]
})
export class TaskItemComponent implements OnInit {

  @Output() taskComplete = new EventEmitter();
  @Output() taskClick = new EventEmitter();
  @Input() item: TaskVM;
  avatar: string;
  widerPriority = 'in';

  constructor() {
  }

  ngOnInit() {
    this.avatar = (this.item.owner) ? <string>this.item.owner.avatar : 'unassigned';
  }

  onCheckboxClick(ev: Event) {
    ev.stopPropagation();
  }

  checkboxChanged() {
    this.taskComplete.emit();
  }

  itemClicked(ev: Event) {
    ev.preventDefault();
    this.taskClick.emit();
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
