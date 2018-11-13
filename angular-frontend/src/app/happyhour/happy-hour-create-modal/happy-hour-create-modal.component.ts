import {Component, Inject, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormArray} from "@angular/forms";
import { MatCardModule,MatTabsModule, MatVerticalStepper, MatFormField, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-happy-hour-create-modal',
  templateUrl: './happy-hour-create-modal.component.html',
  styleUrls: ['./happy-hour-create-modal.component.scss']
})
export class HappyHourCreateModalComponent implements OnInit {

    form: FormGroup;
    selectedIndex: Number;
   //makes the places autocomplete work
    @ViewChild('places') places: GooglePlaceDirective;
  
    constructor(private formBuilder:FormBuilder){
     
    }

    ngOnInit() {
      this.selectedIndex=0;
      //TODO need to figure out how i am going to store each day of the week
      this.form = this.formBuilder.group({
        barName : ['',Validators.required],
        foodSpecials : this.formBuilder.array([
                this.createNewSpecial()
         ]),
        drinkSpecials : this.formBuilder.array([
                this.createNewSpecial()
         ]),
        floatLabel : 'auto'
      });
      
    }

    handleAddressChange(address) {
        console.log(address.geometry.location.lng());
        console.log(address.geometry.location.lat());
        console.log(address.geometry.location.toJSON());
        console.log(address);
    }

  /**
   * Create new item for food or drink
   */
  private createNewSpecial() {
    return this.formBuilder.group({
      itemName: ['', Validators.required],
      itemPrice: [1, [Validators.required]],
      itemQty: [''],
    });
  }
  
  /**
   * Add new special into form as blank
   * specialType - is a string to grab which array we are adding to
   */
  private addSpecial(specialType: any) {
    const control = <FormArray>this.form.controls[specialType];
    control.push(this.createNewSpecial());
  }
  /**
   * Support changing of the tabs by clicking the next button
   */
  selectedIndexChange(val :number ){
    this.selectedIndex=val;
  }
  /**
   * @val will either be 1 or -1 if going back
   */
  changeDailyTab(val :number) {
    this.selectedIndex+=val;
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
