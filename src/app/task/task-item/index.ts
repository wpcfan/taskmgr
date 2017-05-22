import { 
  Component, 
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  HostListener,
  OnInit
} from '@angular/core';
import * as models from '../../domain';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent implements OnInit{
  @Output() taskComplete = new EventEmitter<string>();
  @Output() taskClick = new EventEmitter<string>();
  @Input() item: models.Task;
  avatar: string;
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
  
  onDragStart(e, src){
    // this.store$.dispatch(new actions.DragAction(src.id));
    // this.dragged = e.target;
    e.target.style.opacity=.5;
    e.target.style.border = "#ff525b dashed 2px"
  }
  
  onDragEnd(e){
    e.target.style.opacity=1;
    e.target.style.background = "#EEEEEE";
    e.target.style.border = "";
  }
  onDragOver(e){
    e.preventDefault();
  }
  onDrop(e, target){
    // prevent default action
    e.preventDefault();
    
    // move dragged elem to the selected drop target
    if (e.target.className == "list-container") {
      // this.store$.dispatch(new actions.DropAction(target.id));
      e.target.style.background = "#EEEEEE";
    }
  }
  onDragEnter(e){
    // highlight potential drop target when the draggable element enters it
    if (e.target.className == "list-container" ) {
      e.target.style.background = "purple";
    }
  }
  onDragLeave(e){
    // reset background of potential drop target when the draggable element leaves it
    if (e.target.className == "list-container" ) {
      e.target.style.background = "#EEEEEE";
    }
  }
}
