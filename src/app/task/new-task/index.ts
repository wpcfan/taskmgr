import { 
  Component, 
  OnInit, 
  OnDestroy,
  Inject, 
  ViewChild,
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
  MdAutocompleteTrigger,
  OverlayContainer
} from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/observable/concat";
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
  subTheme: Subscription;
  priorities: {label:string; value: number}[] = [
    {
      label: '普通',
      value: 3
    },
    {
      label: '重要',
      value: 2
    },
    {
      label: '紧急',
      value: 1
    },
  ];
  ownerResults: Observable<User[]>;
  followerResults: Observable<User[]>;
  showOwner$: Observable<boolean>;
  showAuto$: Observable<boolean>;
  owners: User[];
  followers: User[];
  tags: string[];
  @ViewChild("assignee") trigger: MdAutocompleteTrigger;

  constructor(  
    private oc: OverlayContainer,
    private fb: FormBuilder,
    private store$: Store<fromRoot.State>,
    private service: UserService,
    @Inject(MD_DIALOG_DATA) private data: any,
    private dialogRef: MdDialogRef<NewTaskComponent>) { 
      this.subTheme = this.store$.select(fromRoot.getTheme)
        .filter(t => t)
        .subscribe(result => oc.themeClass= 'myapp-dark-theme');
    }

  ngOnInit(){
    if(!this.data.task) {
      this.form = this.fb.group({
        desc: ['', Validators.required],
        priority: [3],
        dueDate: [],
        reminder:[],
        ownerChip: [[]],
        ownerSearch: [''],
        followerSearch: [''],
        // tagsInput: [''],
        remark: ['']
      });
      this.dialogTitle = '创建任务：';
      this.followers = [];
      this.owners = [];
      // this.tags = [];
    }
    else {
      this.form = this.fb.group({
        desc: [this.data.task.desc, Validators.required],
        priority: [this.data.task.priority],
        dueDate: [this.data.task.dueDate],
        reminder: [this.data.task.reminder],
        ownerChip: [this.data.task.owner?[{name: this.data.task.owner.name, value: this.data.task.owner.id}]:[]],
        ownerSearch: [''],
        followerSearch: [''],
        // tagsInput: [''],
        remark: [this.data.task.remark]
      });
      this.dialogTitle = '修改任务：';
      this.followers = this.data.task.paticipants?[...this.data.task.paticipants]:[];
      this.owners = this.data.task.owner?[this.data.task.owner]:[];
      // this.tags = this.data.tags;
    }
    this.ownerResults = this.searchUsers(this.form.controls['ownerSearch'].valueChanges);
    this.followerResults = this.searchUsers(this.form.controls['followerSearch'].valueChanges);
    const ownerChip$ = this.form.controls['ownerChip'].valueChanges.map(a => {
      return a.length === 0 ? false: true
    }).startWith(true);
    this.showOwner$ = ownerChip$;   
  }

  ngOnDestroy(){
    if(this.subTheme) 
      this.subTheme.unsubscribe();
  }

  onSubmit({value, valid}, event: Event){
    event.preventDefault();
    if(!valid) return;
    if(!this.data.task)
      this.store$.dispatch(
        new actions.AddTaskAction({
          desc: value.desc,
          taskListId: this.data.taskListId,
          ownerId: this.owners.length === 1? this.owners[0].id: null,
          completed: false,
          participantIds: this.followers.map(user => user.id),
          dueDate: value.dueDate,
          reminder: value.reminder,
          createDate: new Date(),
          priority: value.priority,
          // order: this.data.order,
          // tags: ['something'],
          remark: value.remark
        }));
    else
      this.store$.dispatch(
        new actions.UpdateTaskAction({
          id: this.data.task.id,
          desc: value.desc,
          taskListId: this.data.task.taskListId,
          ownerId: this.owners.length === 1? this.owners[0].id: null,
          completed: false,
          participantIds: this.followers.map(user => user.id),
          dueDate: value.dueDate,
          reminder: value.reminder,
          createDate: this.data.task.createDate,
          priority: value.priority,
          // order: this.data.task.order,
          // tags: ['something'],
          remark: value.remark
        }));
    this.dialogRef.close();
  }

  displayUser(user: User): string {
    return user ? user.name : '';
  }

  handleAssigneeSelection(user: User){
    this.owners = [user];
    this.form.patchValue({ownerSearch: user.name});
    // 注意必须发射事件后才可以影响其他控件
    this.form.updateValueAndValidity({onlySelf: true, emitEvent: true});
  }

  handleFollowerSelection(user: User){
    if(this.followers.map(fl => fl.id).indexOf(user.id)>=0) return;
    this.followers = [...this.followers, user];
    this.form.patchValue({followerSearch: user.name});
    // 注意必须发射事件后才可以影响其他控件
    this.form.updateValueAndValidity({onlySelf: true, emitEvent: true});
  }

  removeOwner(owner: User){
    this.owners = [];
  }

  removeFollower(follower: User){
    this.followers = this.followers.filter(fl => fl.id !== follower.id);
  }

  searchUsers(obs: Observable<string>): Observable<User[]>{
    return obs.startWith(null)
      .debounceTime(300)
      .distinctUntilChanged()
      .filter(s => s && s.length>1)
      .switchMap(str => this.service.searchUsers(str));
  }

  // addTag(ev: Event){
  //   ev.preventDefault();
  //   const val = this.form.value.tagsInput;
  //   if(this.followers.indexOf(val)>=0) return;
  //   this.tags = [...this.tags, val];
  //   this.form.updateValueAndValidity({onlySelf: true, emitEvent: true});
  // }

  // removeTag(ev: Event, tag: string){
  //   ev.preventDefault();
  //   this.tags = this.tags.filter(str => str != tag);
  // }
}
