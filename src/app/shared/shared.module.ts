import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { 
  MdInputModule, 
  MdSelectModule, 
  MdButtonToggleModule,
  MdCardModule,
  MdButtonModule,
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
    MdButtonModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdInputModule,
    MdSelectModule,
    MdButtonToggleModule,
    MdCardModule,
    MdButtonModule
  ],
  declarations: []
})
export class SharedModule { }
