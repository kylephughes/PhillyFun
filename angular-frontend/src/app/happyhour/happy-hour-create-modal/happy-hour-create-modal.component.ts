import { Component, Inject, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from "@angular/forms";
import { MatCardModule, MatTabsModule, MatVerticalStepper, MatFormField, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
//import {} from 'googlemaps';
/// <reference types="@types/googlemaps" />
import { DailySpecialsCardComponent } from '../daily-specials-card/daily-specials-card.component';

@Component({
  selector: 'app-happy-hour-create-modal',
  templateUrl: './happy-hour-create-modal.component.html',
  styleUrls: ['./happy-hour-create-modal.component.scss']
})
export class HappyHourCreateModalComponent implements OnInit {

  form: FormGroup;
  selectedIndex: any;
  //makes the places autocomplete work
  @ViewChild('places') places: GooglePlaceDirective;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.selectedIndex = 0;
    this.form = this.formBuilder.group({
      barName: ['', Validators.required],
      floatLabel: 'auto'
    });
  }

  handleAddressChange(address) {
    console.log(address.geometry.location.lng());
    console.log(address.geometry.location.lat());
    console.log(address.geometry.location.toJSON());
    console.log(address);
  }
  /**
   * This will catch an event from the daily-special-card (child) and add onto the
   * main form
  */
  private addFormControl(name: string, formGroup: FormGroup): void {
    this.form.addControl(name, formGroup);
  }

  /**
   * Support changing of the tabs by clicking the next button
   */
  selectedIndexChange(val: number) {
    this.selectedIndex = val;
  }
  /**
   * Called as event from the child
   * @val will either be 1 or -1 if going back
   */
  changeDailyTab(val: Number) {
    this.selectedIndex = this.selectedIndex + val;
  }

  nextStep() {
    console.log(this.form.value)

  }

  save() {
    //this.dialogRef.close("hllo");
  }

  close() {
    //this.dialogRef.close();
  }
}
