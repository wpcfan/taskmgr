import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface ConfirmDialog {
  title: string;
  content: string;
  confirmAction: string;
}

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h1 matDialogTitle>{{ dialog.title }}</h1>
    <div matDialogContent>{{ dialog.content }}</div>
    <div matDialogActions>
      <button mat-raised-button color="primary" (click)="handleAction(true)">{{ dialog.confirmAction }}</button>
      <button mat-raised-button matDialogClose type="button" (click)="handleAction(false)">关闭</button>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {

  dialog: ConfirmDialog;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<ConfirmDialogComponent>) {
    if (this.data.dialog !== undefined || this.data.dialog !== null) {
      this.dialog = this.data.dialog;
    }
  }

  handleAction(result: boolean) {
    this.dialogRef.close(result);
  }
}
