import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { 
  MdInputModule, 
  MdSelectModule, 
  MdButtonToggleModule,
  MdCardModule,
  MdButtonModule,
  MdDialogModule
} from '@angular/material';

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
    MdDialogModule
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
    MdDialogModule
  ],
  declarations: []
})
export class SharedModule { }
