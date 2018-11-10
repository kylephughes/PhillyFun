import {Component, Inject, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { MatVerticalStepper, MatFormField, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-happy-hour-create-modal',
  templateUrl: './happy-hour-create-modal.component.html',
  styleUrls: ['./happy-hour-create-modal.component.scss']
})
export class HappyHourCreateModalComponent implements OnInit {

    form: FormGroup;
    @ViewChild('places') places: GooglePlaceDirective;
  
    constructor(private formBuilder:FormBuilder){
      
    }

    ngOnInit() {
      this.form = this.formBuilder.group({
        barName : ['',Validators.required],
        experience : ['',Validators.required],
        floatLabel : 'auto'
      });
    }

    handleAddressChange(address) {
        console.log(address.geometry.location.lng());
        console.log(address.geometry.location.lat());
        console.log(address.geometry.location.toJSON());
        console.log(address);
    }
  
    nextStep() {
      alert("wef34");
    }

    save() {
        //this.dialogRef.close("hllo");
    }

    close() {
       //this.dialogRef.close();
    }
}
