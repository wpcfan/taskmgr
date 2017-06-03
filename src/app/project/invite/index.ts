import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef, OverlayContainer} from '@angular/material';
import {User} from '../../domain';

@Component({
  selector: 'app-invite',
  template: `
    <md-card>
      <h2 md-dialog-title>{{dialogTitle}}</h2>
      <form class="full-width" #f="ngForm" (ngSubmit)="onSubmit($event, f)">
        <app-chips-list [items]="members" [label]="'邀请成员'" name="members" [(ngModel)]="members"></app-chips-list>
        <div md-dialog-actions>
          <button 
            md-raised-button
            color="primary"
            type="submit"
            [disabled]="!f.valid">
            保存
          </button>
          <button md-dialog-close md-raised-button type="button">关闭</button>
        </div>
    </form>
    </md-card>
    `,
  styles: [``]
})
export class InviteComponent implements OnInit {

  members: User[] = [];
  dialogTitle = '邀请成员';

  constructor(
    @Inject(MD_DIALOG_DATA) private data: any,
    private dialogRef: MdDialogRef<InviteComponent>,
    private oc: OverlayContainer) { }

  ngOnInit() {
    this.oc.themeClass = this.data.darkTheme ? 'myapp-dark-theme' : null;
    this.members = [...this.data.members];
  }

  onSubmit(ev: Event, {value, valid}) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    console.log(this.members);
    this.dialogRef.close(this.members);
  }
}
