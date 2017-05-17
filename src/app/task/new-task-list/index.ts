import { 
  Component, 
  OnInit, 
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
  MD_DIALOG_DATA 
} from '@angular/material';
import { Store } from '@ngrx/store';
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
  constructor( 
    private fb: FormBuilder,
    private store$: Store<fromRoot.State>,
    @Inject(MD_DIALOG_DATA) private data: any,
    private dialogRef: MdDialogRef<NewTaskListComponent>) { }

  ngOnInit() {
    if(this.data.taskList.id === undefined || this.data.taskList.id === null) {
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

  onSubmit({value, valid}, event: Event){
    event.preventDefault();
    if(!valid) return;
    if(this.data.taskList.id === undefined || this.data.taskList.id === null)
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
