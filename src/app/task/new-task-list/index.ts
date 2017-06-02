import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MD_DIALOG_DATA, MdDialogRef, OverlayContainer} from '@angular/material';

@Component({
  selector: 'app-new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTaskListComponent implements OnInit {
  form: FormGroup;
  dialogTitle: string;

  constructor(private oc: OverlayContainer,
              private fb: FormBuilder,
              @Inject(MD_DIALOG_DATA) private data: any,
              private dialogRef: MdDialogRef<NewTaskListComponent>) {
    this.oc.themeClass = this.data.darkTheme ? 'myapp-dark-theme' : null;
  }

  ngOnInit() {
    if (!this.data.name) {
      this.form = this.fb.group({
        name: ['', Validators.required]
      });
      this.dialogTitle = '创建列表：';
    } else {
      this.form = this.fb.group({
        name: [this.data.name, Validators.required],
      });
      this.dialogTitle = '修改列表：';
    }
  }

  onSubmit({value, valid}, event: Event) {
    event.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close(value.name);
  }
}
