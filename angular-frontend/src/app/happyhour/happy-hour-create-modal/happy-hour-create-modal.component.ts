import { Component, Inject, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from "@angular/forms";
import { MatCardModule, MatTabsModule, MatVerticalStepper, MatFormField, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
//import {} from 'googlemaps';
/// <reference types="@types/googlemaps" />
import { DailySpecialsCardComponent } from '../daily-specials-card/daily-specials-card.component';
import { HappyhourService } from '../happyhour.service';

@Component({
  selector: 'app-happy-hour-create-modal',
  templateUrl: './happy-hour-create-modal.component.html',
  styleUrls: ['./happy-hour-create-modal.component.scss']
})
export class HappyHourCreateModalComponent implements OnInit {

  form: FormGroup;
  selectedIndex: any;
  //save the previous times from previous tab
  lastStartTime: any;
  lastEndTime: any;
  //makes the places autocomplete work
  @ViewChild('places') places: GooglePlaceDirective;
  //dialogRef is a reference to te dialog controller this component
  constructor(private dialogRef: MatDialogRef<HappyHourCreateModalComponent>,
    private formBuilder: FormBuilder,
    private happyhourServ: HappyhourService) {

  }

  ngOnInit() {
    this.selectedIndex = 0;
    //googlePlace is bound to the input, but the rest are filled out based on
    //the google api data
    this.form = this.formBuilder.group({
      googlePlace: ['', Validators.required],
      name: [''],
      latitude: [''],
      longitude: [''],
      formattedAddress: ['']
    });
  }


  /**
    Dynamically add onto the form when google place changes
    @address json from the google places
  */
  handleAddressChange(address) {
    (<FormControl>this.form.controls['name']).setValue(address.name);
    (<FormControl>this.form.controls['latitude']).setValue(address.geometry.location.lat());
    (<FormControl>this.form.controls['longitude']).setValue(address.geometry.location.lng());
    (<FormControl>this.form.controls['formattedAddress']).setValue(address.formatted_address);
  }
  /**
   * This will catch an event from the daily-special-card (child) and add onto the
   * main form
  */
  private addFormControl(name: string, formGroup: FormGroup): void {
    this.form.addControl(name, formGroup);
  }

  /**
   * Support changing of the tabs by clicking the > button
   */
  selectedIndexChange(val: number) {
    this.selectedIndex = val;
  }
  /**
   * Called as event from the child, pass previous tabs
   * values to next tab to prefill start and end times
   * @val an object with 3 values
   */
  changeDailyTab(val: any) {
    this.lastStartTime = val.st;
    this.lastEndTime = val.et;
    this.selectedIndex = this.selectedIndex + val.val;
  }


  /**
    Send request to nodejs, close the modal if success
  */
  submit() {
    console.log(this.form.value);

    this.happyhourServ.postNewHappyHour(this.form.value)
      .subscribe(
        apiResponse => {
          //  this.apiResponse = apiResponse;
          this.dialogRef.close();
          console.log('submitted form heres the response? ' + apiResponse);
        }
      );
  }
}
