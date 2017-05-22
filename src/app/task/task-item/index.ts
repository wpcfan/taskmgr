import { 
  Component, 
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  HostListener,
  OnInit
} from '@angular/core';
import { Task } from '../../domain';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent implements OnInit{
  @Output() taskComplete = new EventEmitter<string>();
  @Output() taskClick = new EventEmitter<string>();
  @Output() draggingTaskId = new EventEmitter<string>();
  @Input() item: Task;
  avatar: string;
  draggingStatus: string;
  widerPriority: boolean = false;
  constructor() { }

  ngOnInit(){
    this.avatar = (this.item.owner) ? this.item.owner.avatar : '/assets/img/avatar/unassigned.svg';
  }

  checkboxChanged(){
    this.taskComplete.emit(this.item.id);
  }

  itemClicked(ev: Event){
    ev.preventDefault();
    this.taskClick.emit(this.item.id);
  }

  @HostListener('mouseenter')
  handleMouseEnter(){
    this.widerPriority = true;
  }

  @HostListener('mouseleave')
  handleMouseLeave(){
    this.widerPriority = false;
  }
  
  onDragStart(e){
    this.draggingStatus = 'start';
    this.draggingTaskId.emit(this.item.id);
  }

  onDragEnd(e){
    this.draggingStatus = 'end';
  }
}
