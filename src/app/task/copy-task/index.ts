import { Component, OnInit, Inject } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import * as fromRoot from "../../reducers";
import * as actions from '../../actions/task.action';
import { TaskList } from "../../domain";
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

@Component({
  selector: 'app-copy-task',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit(form, $event)">
      <span md-dialog-title>{{dialogTitle}}</span>
      <div md-dialog-content>
        <md-select placeholder="选择目标列表" formControlName="targetList" class="full-width">
          <md-option *ngFor="let list of lists$ | async" [value]="list.id">
            {{list.name}}
          </md-option>
        </md-select>
        <div>
          <button md-raised-button color="primary" type="submit" [disabled]="!form.valid">确定</button>
          <button md-dialog-close md-raised-button type="button">关闭</button>
        </div>
      </div>
    </form>
    `,
  styles: [``]
})
export class CopyTaskComponent implements OnInit {
  form: FormGroup;
  dialogTitle: string;

  lists$: Observable<TaskList>;

  constructor(
    private store$: Store<fromRoot.State>,
    private fb: FormBuilder,
    @Inject(MD_DIALOG_DATA) private data: any,
    private dialogRef: MdDialogRef<CopyTaskComponent>) { 
    
  }

  ngOnInit() { 
    this.lists$ = this.lists$ = this.store$
      .select(fromRoot.getProjectTaskList)
      .map(lists => lists.filter(list => list.id !== this.data.srcListId));
    if(this.data.type==='move'){
      this.dialogTitle = '移动所有任务';
    } 
    this.form = this.fb.group({
      targetList: ['', Validators.required]
    });
  }

  onSubmit({value, valid}, $event){
    event.preventDefault();
    if(!valid) return;
    this.store$.dispatch(new actions.MoveAllAction({srcListId: this.data.srcListId, targetListId: value.targetList}));
    this.dialogRef.close();
  }
}