import { 
  Component, 
  OnInit, 
  Input, 
  Output, 
  EventEmitter 
} from '@angular/core';

import { 
  FormGroup, 
  FormBuilder, 
  FormControl,
  Validators 
} from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input("checked") checked: boolean = false;
  @Input("desc") desc: string = '';
  @Output("toggle") toggleEvent = new EventEmitter<void>();
  @Output("remove") removeEvent = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  toggle(){
    this.toggleEvent.emit();
  }

  remove(){
    this.removeEvent.emit();
  }
}
