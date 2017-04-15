import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import * as entities from '../../domain';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  dialog: entities.ConfirmDialog;
  constructor(
    @Inject(MD_DIALOG_DATA) private data: any,
    private dialogRef: MdDialogRef<ConfirmDialogComponent>) { 
      if(this.data.dialog !== undefined || this.data.dialog !== null)
        this.dialog = this.data.dialog;
    }

  ngOnInit() {

  }

  handleAction(result: boolean){
    this.dialogRef.close(result);
  }
}
