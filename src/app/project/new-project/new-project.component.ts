import { Component, OnInit } from '@angular/core';
import { 
  FormGroup, 
  FormBuilder, 
  FormControl,
  Validators 
} from '@angular/forms';
import {MdDialog, MdDialogRef} from '@angular/material';
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
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromRoot.State>,
    private dialogRef: MdDialogRef<NewProjectComponent>) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      desc: ['']
    });
  }

  onSubmit({value, valid}){
    if(!valid) return;
    this.store$.dispatch(
      new actions.AddProjectAction({
        name: value.name,
        desc: value.desc
      }));
    this.dialogRef.close();
  }

}
