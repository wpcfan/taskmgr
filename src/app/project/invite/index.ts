import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {User} from '../../domain';

@Component({
  selector: 'app-invite',
  template: `
    <h2 md-dialog-title>{{dialogTitle}}</h2>
    <form class="full-width" #f="ngForm" (ngSubmit)="onSubmit($event, f)">
      <app-chips-list [label]="'邀请成员'" name="members" [(ngModel)]="members">
      </app-chips-list>
      <div md-dialog-actions>
        <button md-raised-button color="primary" type="submit" [disabled]="!f.valid">
          保存
        </button>
        <button md-dialog-close md-raised-button type="button">关闭</button>
      </div>
    </form>
    `,
  styles: [``]
})
export class InviteComponent implements OnInit {

  members: User[] = [];
  dialogTitle: string;

  constructor(
    @Inject(MD_DIALOG_DATA) private data: any,
    private dialogRef: MdDialogRef<InviteComponent>) { }

  ngOnInit() {
    this.members = [...this.data.members];
    this.dialogTitle = this.data.dialogTitle ? this.data.dialogTitle : '邀请成员';
  }

  onSubmit(ev: Event, {value, valid}) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close(this.members);
  }
}
