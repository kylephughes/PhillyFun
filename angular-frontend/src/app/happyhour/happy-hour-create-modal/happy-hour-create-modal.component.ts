import { Component, Inject, OnInit, ViewEncapsulation, ViewChild, Optional } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from "@angular/forms";
import {
  MatProgressBarModule, MatCardModule,
  MatTabsModule, MatVerticalStepper, MatFormField, MatDialogRef, MAT_DIALOG_DATA
} from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';

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

  //used to dynamically create  daily special card's
  days : { label: string, day: string }[];
  //edit or new title or button
  title : string;
  buttonName : string;

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

  ) {}

  ngOnInit() {
    this.selectedIndex = 0;
    this.days = [
      {"label":"Mon","day":"monSpecials"},
      {"label":"Tue","day":"tueSpecials"},
      {"label":"Wed","day":"wedSpecials"},
      {"label":"Thr","day":"thrSpecials"},
      {"label":"Fri","day":"friSpecials"},
      {"label":"Sat","day":"satSpecials"},
      {"label":"Sun","day":"sunSpecials"}];
    //googlePlace is bound to the input, but the rest are filled out based on
    //the google api data
    this.setEditOrNew();
    this.form = this.formBuilder.group({
      googlePlace: [this.editData.name, Validators.required],
      name: [this.editData.name],
      latitude: [this.editData.latitude],
      longitude: [this.editData.longitude],
      formattedAddress: [this.editData.formattedAddress]
    });
  }

  setEditOrNew = () => {this.editData.name == '' ? 
                        (this.title='Add Happy Hour',this.buttonName='Submit') :
                        (this.title='Edit -- ' + this.editData.name,this.buttonName='Save')  };
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
   * Support changing of the tabs by clicking the > button
   */
  selectedIndexChange(val: number) {
    this.selectedIndex = val;
  }
  /**
   * Called as event from the child, custom tab arrow was clicked
   * @val an object with 3 values
   */
  changeDailyTab(val: any) {
    this.selectedIndex = this.selectedIndex + val;
  }


  /**
    Send request to nodejs, close the modal if success
  */
  submit() {
    console.log(this.form.value);
    this.dataSent = true;
    if(this.editData.name == '') {
    this.happyhourServ.postNewHappyHour(this.form.value)
      .subscribe(
        apiResponse => {
          //  this.apiResponse = apiResponse;
          this.dataSent = false;
          //modify the config more 
          this.snackbar.open("Happy Hour has been created!", 'Close',
            { duration: 6000, verticalPosition: 'top' });
          this.dialogRef.close();
        }
      );
    } else {
      this.happyhourServ.updateHappyHour(this.editData._id,this.form.value)
      .subscribe(
        apiResponse => {
          //  this.apiResponse = apiResponse;
          this.dataSent = false;
          //modify the config more 
          this.snackbar.open(this.editData.name + " has been updated!", 'Close',
            { duration: 6000, verticalPosition: 'top' });
          this.dialogRef.close();
        }
      );
    }
  }
}
