import { 
  Component, 
  OnInit, 
  OnDestroy,
  Inject, 
  ChangeDetectionStrategy 
} from '@angular/core';
import { 
  FormGroup, 
  FormBuilder, 
  FormControl,
  Validators 
} from '@angular/forms';
import { 
  MdDialogRef, 
  MD_DIALOG_DATA,
  OverlayContainer
} from '@angular/material';
import { Store } from '@ngrx/store';
import { Subscription } from "rxjs/Subscription";
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/task-list.action';

@Component({
  selector: 'app-new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTaskListComponent implements OnInit {
  form: FormGroup;
  dialogTitle: string;
  subTheme: Subscription;
  constructor( 
    private oc: OverlayContainer,
    private fb: FormBuilder,
    private store$: Store<fromRoot.State>,
    @Inject(MD_DIALOG_DATA) private data: any,
    private dialogRef: MdDialogRef<NewTaskListComponent>) { 
      this.subTheme = this.store$.select(fromRoot.getTheme)
        .filter(t => t)
        .subscribe(result => oc.themeClass= 'myapp-dark-theme');
    }

  ngOnInit() {
    if(!this.data.taskList.id) {
      this.form = this.fb.group({
        name: ['', Validators.required]
      });
      this.dialogTitle = '创建列表：';
    }
    else {
      this.form = this.fb.group({
        name: [this.data.taskList.name, Validators.required],
      });
      this.dialogTitle = '修改列表：';
    }
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.subTheme)
      this.subTheme.unsubscribe();
  }
  
  onSubmit({value, valid}, event: Event){
    event.preventDefault();
    if(!valid) return;
    if(!this.data.taskList.id)
      this.store$.dispatch(
        new actions.AddTaskListAction({
          name: value.name,
          projectId: this.data.taskList.projectId,
          order: this.data.taskList.order,
        }));
    else
      this.store$.dispatch(
        new actions.UpdateTaskListAction({
          id: this.data.taskList.id,
          name: value.name,
          projectId: this.data.taskList.projectId,
          order: this.data.taskList.order,
        }));
    this.dialogRef.close();
  }
}
