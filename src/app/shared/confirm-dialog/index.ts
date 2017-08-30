import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

export interface ConfirmDialog {
  title: string;
  content: string;
  confirmAction: string;
}

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h1 mdDialogTitle>{{dialog.title}}</h1>
    <div mdDialogContent>{{dialog.content}}</div>
    <div md-dialog-actions>
      <button md-raised-button color="primary" (click)="handleAction(true)">{{dialog.confirmAction}}</button>
      <button md-raised-button mdDialogClose type="button" (click)="handleAction(false)">关闭</button>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {

  dialog: ConfirmDialog;

  constructor(@Inject(MD_DIALOG_DATA) private data: any,
              private dialogRef: MdDialogRef<ConfirmDialogComponent>) {
    if (this.data.dialog !== undefined || this.data.dialog !== null) {
      this.dialog = this.data.dialog;
    }
  }

  handleAction(result: boolean) {
    this.dialogRef.close(result);
  }
}
