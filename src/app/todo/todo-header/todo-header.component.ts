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
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.scss']
})
export class TodoHeaderComponent implements OnInit {
  form: FormGroup;
  toggleAll: boolean = false;
  @Output("toggleAll") toggleAllEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output("textSubmit") textSubmitEvent: EventEmitter<string> = new EventEmitter<string>();
  validateErr: string = '';

  constructor(private fb: FormBuilder) { }
  
  ngOnInit(){
    this.form = this.fb.group({
      desc: ['', Validators.required]
    });
  }

  onClick(){
    this.toggleAll = ! this.toggleAll;
    this.toggleAllEvent.emit(this.toggleAll);
  }

  onSubmit({valid, value}){
    if(!valid) return;
    this.textSubmitEvent.emit(value);
    this.form.reset();
  }
}
