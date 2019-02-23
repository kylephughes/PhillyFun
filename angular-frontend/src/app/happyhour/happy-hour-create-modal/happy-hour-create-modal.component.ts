import { Component, Inject, OnInit, ViewEncapsulation, ViewChild, Optional } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from "@angular/forms";
import {
  MatProgressBarModule, MatCardModule,
  MatTabsModule, MatVerticalStepper, MatFormField, MatDialogRef, MAT_DIALOG_DATA
} from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
//import {} from 'googlemaps';
/// <reference types="@types/googlemaps" />
import { DailySpecialsCardComponent } from '../daily-specials-card/daily-specials-card.component';
import { HappyhourService } from '../happyhour.service';
import { HappyHourModel } from 'src/app/models/HappyHourModel';

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
  //controls the progress bar
  dataSent: boolean = false;

  //makes the places autocomplete work
  @ViewChild('places') places: GooglePlaceDirective;
  //dialogRef is a reference to te dialog controller this component
  //editData defaulted or contains edit information
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) private editData: HappyHourModel,
    @Optional() private dialogRef: MatDialogRef<HappyHourCreateModalComponent>,
    private formBuilder: FormBuilder,
    private happyhourServ: HappyhourService,
    private snackbar: MatSnackBar

  ) {

  }

  ngOnInit() {
    this.selectedIndex = 0;
    //googlePlace is bound to the input, but the rest are filled out based on
    //the google api data
    this.form = this.formBuilder.group({
      googlePlace: [this.editData.name, Validators.required],
      name: [this.editData.name],
      latitude: [this.editData.latitude],
      longitude: [this.editData.longitude],
      formattedAddress: [this.editData.formattedAddress]
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
    this.dataSent = true;
    this.happyhourServ.postNewHappyHour(this.form.value)
      .subscribe(
        apiResponse => {
          //  this.apiResponse = apiResponse;
          this.dataSent = false;
          this.dialogRef.close();
          //modify the config more 
          this.snackbar.open("Happy Hour has been created!", 'Close',
            { duration: 2000, verticalPosition: 'top' });
        }
      );
  }
}
