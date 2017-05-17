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
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/distinctUntilChanged";
import { UserService } from "../../services";
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/task.action';
import { User, Task } from "../../domain";

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTaskComponent implements OnInit {
  form: FormGroup;
  dialogTitle: string;
  searchResults: Observable<User[]>;

  constructor(    
    private fb: FormBuilder,
    private store$: Store<fromRoot.State>,
    private service: UserService,
    @Inject(MD_DIALOG_DATA) private data: any,
    private dialogRef: MdDialogRef<NewTaskComponent>) { }

  ngOnInit(){
    if(!this.data.task) {
      this.form = this.fb.group({
        desc: ['', Validators.required],
        priority: [3],
        dueDate: [new Date()],
        reminder:[new Date()],
        ownerChip: [[{name: this.data.user.name, value: this.data.user.id}]],
        ownerSearch: ['']
      });
      this.dialogTitle = '创建任务：';
    }
    else {
      this.form = this.fb.group({
        desc: [this.data.task.desc, Validators.required],
        priority: [this.data.task.priority],
        dueDate: [this.data.task.dueDate],
        reminder: [this.data.task.reminder],
        ownerChip: [{name: this.data.user.name, value: this.data.user.id}],
        ownerSearch: ['']
      });
      this.dialogTitle = '修改任务：';
    }
    this.searchResults = this.form.controls['ownerSearch'].valueChanges
      .startWith(null)
      .debounceTime(300)
      .distinctUntilChanged()
      .filter(s => s && s.length>1)
      .switchMap(str => this.service.searchUsers(str));
  }

  onSubmit({value, valid}, event: Event){
    event.preventDefault();
    if(!valid) return;
    if(this.data.task === undefined || this.data.task === null)
      this.store$.dispatch(
        new actions.AddTaskAction({
          desc: value.desc,
          taskListId: this.data.taskListId,
          ownerId: this.data.user.id,
          completed: false,
          participantIds: ["1"],
          dueDate: value.dueDate,
          reminder: value.reminder,
          createDate: new Date(),
          priority: value.priority,
          order: 4,
          tags: ['something'],
          remark: value.remark
        }));
    else
      this.store$.dispatch(
        new actions.UpdateTaskAction({
          id: this.data.task.id,
          desc: value.desc,
          taskListId: this.data.taskListId,
          ownerId: this.data.user.id,
          completed: false,
          participantIds: ["1"],
          dueDate: value.dueDate,
          reminder: value.reminder,
          createDate: new Date(),
          priority: value.priority,
          order: 4,
          tags: ['something'],
          remark: value.remark
        }));
    this.dialogRef.close();
  }

  displayUser(user: User): string {
    return user ? user.name : '';
  }
}
