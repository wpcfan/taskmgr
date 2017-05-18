import { 
  Component, 
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import * as models from '../../domain';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent {
  @Output() taskComplete = new EventEmitter<string>();
  @Output() taskClick = new EventEmitter<string>();
  @Input() item: models.Task;

  constructor() { }

  checkboxChanged(){
    this.taskComplete.emit(this.item.id);
  }

  itemClicked(ev: Event){
    ev.preventDefault();
    this.taskClick.emit(this.item.id);
  }
}
