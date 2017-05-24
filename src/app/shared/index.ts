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
  MdGridListModule,
  MdListModule,
  MdProgressBarModule,
  MdCheckboxModule,
  MdChipsModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdRadioModule,
  MdAutocompleteModule,
  MdSidenavModule, 
  MdToolbarModule, 
  MdSlideToggleModule
} from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog';
import { ImageListSelectComponent } from './image-list-select';
import { ChipsListComponent } from './chips-list';
import { InitialsPipe } from './initials.pipe';

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
    MdGridListModule,
    MdListModule,
    MdMenuModule,
    MdIconModule,
    MdProgressBarModule,
    MdCheckboxModule,
    MdChipsModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdRadioModule,
    MdAutocompleteModule,
    MdSidenavModule, 
    MdToolbarModule, 
    MdSlideToggleModule,
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
    MdGridListModule,
    MdListModule,
    MdMenuModule,
    MdIconModule,
    MdProgressBarModule,
    MdCheckboxModule,
    MdChipsModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdRadioModule,
    MdAutocompleteModule,
    MdSidenavModule, 
    MdToolbarModule, 
    MdSlideToggleModule,
    ConfirmDialogComponent,
    ImageListSelectComponent,
    ChipsListComponent
  ],
  declarations: [
    ConfirmDialogComponent, 
    ImageListSelectComponent,
    ChipsListComponent,
    InitialsPipe,
    ],
  entryComponents: [
    ConfirmDialogComponent
    ]
})
export class SharedModule { }

export { ConfirmDialogComponent }
