import { Component, OnInit, Inject } from '@angular/core';
import { 
  FormGroup, 
  FormBuilder, 
  FormControl,
  Validators 
} from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as actions from '../../actions/project.action';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {
  form: FormGroup;
  dialogTitle: string;
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromRoot.State>,
    @Inject(MD_DIALOG_DATA) private data: any,
    private dialogRef: MdDialogRef<NewProjectComponent>) { }

  ngOnInit() {
    if(this.data.project === undefined || this.data.project === null) {
      this.form = this.fb.group({
        name: ['', Validators.required],
        desc: ['']
      });
      this.dialogTitle = '创建项目：';
    }
    else {
      this.form = this.fb.group({
        name: [this.data.project.name, Validators.required],
        desc: [this.data.project.desc]
      });
      this.dialogTitle = '修改项目：';
    }
  }

  onSubmit({value, valid}, event: Event){
    event.preventDefault();
    if(!valid) return;
    if(this.data.project === undefined || this.data.project === null)
      this.store$.dispatch(
        new actions.AddProjectAction({
          name: value.name,
          desc: value.desc
        }));
    else
      this.store$.dispatch(
        new actions.UpdateProjectAction({
          id: this.data.project.id,
          name: value.name,
          desc: value.desc
        }));
    this.dialogRef.close();
  }

}
