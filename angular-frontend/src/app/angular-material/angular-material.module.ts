import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule,MatTabsModule,MatStepperModule,MatFormFieldModule, MatInputModule,MatDialogModule,MatToolbarModule,
   MatButtonModule, MatChipsModule,MatSidenavModule, MatIconModule, MatListModule,MatProgressBarModule, MatProgressSpinnerModule,MatSnackBarModule } from '@angular/material';

//All material design components here to clean up app-module
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatTabsModule,
    MatCardModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatTabsModule,
    MatCardModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ]
})
export class AngularMaterialModule { }
