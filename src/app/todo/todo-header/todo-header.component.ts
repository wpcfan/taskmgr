import { 
  Component, 
  OnInit, 
  Input, 
  Output, 
  EventEmitter 
} from '@angular/core';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.scss']
})
export class TodoHeaderComponent implements OnInit {
  desc: string = '';
  toggleAll: boolean = false;
  @Output("toggleAll") toggleAllEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output("textSubmit") textSubmitEvent: EventEmitter<string> = new EventEmitter<string>();
  validateErr: string = '';

  constructor() { }
  
  ngOnInit(){}

  onClick(){
    this.toggleAll = ! this.toggleAll;
    this.toggleAllEvent.emit(this.toggleAll);
  }

  handleText(){
    this.textSubmitEvent.emit(this.desc);
    this.desc = '';
  }
}
