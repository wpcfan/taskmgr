import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef, OverlayContainer} from '@angular/material';

export interface ConfirmDialog {
  title: string;
  content: string;
  confirmAction: string;
}

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h1 md-dialog-title>{{dialog.title}}</h1>
    <div md-dialog-content>{{dialog.content}}</div>
    <div md-dialog-actions>
      <button md-raised-button color="primary" (click)="handleAction(true)">{{dialog.confirmAction}}</button>
      <button md-raised-button md-dialog-close type="button" (click)="handleAction(false)">关闭</button>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent implements OnInit {

  dialog: ConfirmDialog;

  constructor(private oc: OverlayContainer,
              @Inject(MD_DIALOG_DATA) private data: any,
              private dialogRef: MdDialogRef<ConfirmDialogComponent>) {
    if (this.data.dialog !== undefined || this.data.dialog !== null) {
      this.dialog = this.data.dialog;
    }
  }

  ngOnInit() {
    this.oc.themeClass = this.data.darkTheme ? 'myapp-dark-theme' : null;
  }

  handleAction(result: boolean) {
    this.dialogRef.close(result);
  }
}
