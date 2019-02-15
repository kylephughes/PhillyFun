import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule,MatTabsModule,MatStepperModule,MatFormFieldModule, MatInputModule,MatDialogModule,MatToolbarModule,
   MatButtonModule, MatSidenavModule, MatIconModule, MatListModule,MatProgressBarModule,MatSnackBarModule } from '@angular/material';

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
    MatSnackBarModule
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
    MatSnackBarModule
  ]
})
export class AngularMaterialModule { }
