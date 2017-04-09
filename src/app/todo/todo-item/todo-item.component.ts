import { 
  Component, 
  Input, 
  Output, 
  EventEmitter 
} from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent{
  private _completed: boolean = false;
  @Input("desc") desc: string = '';
  @Output("toggle") toggleEvent = new EventEmitter<void>();
  @Output("remove") removeEvent = new EventEmitter<void>();
  constructor() { }

  get completed(){
    return this._completed;
  }
  @Input()
  set completed(value){
    if(value !== undefined)
        this._completed = value; 
  }
  toggle(){
    this.toggleEvent.emit();
  }

  remove(){
    this.removeEvent.emit();
  }
}
