import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { 
  MdInputModule, 
  MdSelectModule, 
  MdButtonToggleModule,
  MdCardModule,
  MdButtonModule,
  MdDialogModule,
  MdMenuModule,
  MdIconModule,
  MdGridListModule
} from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog';
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';

export {ConfirmDialogComponent}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdInputModule,
    MdSelectModule,
    MdButtonToggleModule,
    MdCardModule,
    MdButtonModule,
    MdDialogModule,
    MdMenuModule,
    MdIconModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdInputModule,
    MdSelectModule,
    MdButtonToggleModule,
    MdCardModule,
    MdButtonModule,
    MdDialogModule,
    MdMenuModule,
    MdIconModule,
    ConfirmDialogComponent,
    ImageListSelectComponent
  ],
  declarations: [ConfirmDialogComponent, ImageListSelectComponent],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule { }
