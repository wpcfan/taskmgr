import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef, OverlayContainer} from '@angular/material';

export interface ConfirmDialog {
  title: string;
  content: string;
  confirmAction: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
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
