import { Component, OnInit, SimpleChanges, OnChanges, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { HappyHourModel } from '../../models/HappyHourModel';


@Component({
  selector: 'daily-specials-card',
  templateUrl: './daily-specials-card.component.html',
  styleUrls: ['./daily-specials-card.component.scss']
})
/**
 * Each day during the week is represented by its own component
 */
export class DailySpecialsCardComponent implements OnInit, OnChanges {
  //send the data to to the parent via this event
  @Output()
  private changeTab: EventEmitter<any> = new EventEmitter<any>();
  //accept a variable when called
  @Input('specialsDay')
  private specialsDay: any;
  //accept a variable when called
  @Input('startTime')
  private lastStartTime: any;
  //accept a variable when called
  @Input('endTime')
  private lastEndTime: any;

  //handle form group differently if editing
  @Input('editData')
  private editData: HappyHourModel;

  //the form from the parent
  @Input('mainForm')
  private mainForm : FormGroup;

  private form: FormGroup;

  constructor(private fb: FormBuilder, private atp: AmazingTimePickerService) {

  }

  ngOnInit() {
    //The @Input communication mechanism is processed as part of following 
    //change detection phase so input bindings are not available in constructor.

    //each day has its own specials and times
    if (this.editData.name == '') {
      this.form = this.fb.group({
        startTime: [this.lastStartTime, ''],
        endTime: [this.lastEndTime, ''],
        dayOfWeek: [this.specialsDay],
        specials: this.fb.array([
          this.createNewSpecial('')
        ])
      });
    } else {
      //TODO need specific log here to loop over specials array in editData
      console.log("editing" + this.editData[this.specialsDay].endTime);
      this.form = this.fb.group({
        startTime: [this.editData[this.specialsDay].startTime, ''],
        endTime: [this.editData[this.specialsDay].endTime, ''],
        dayOfWeek: [this.specialsDay],
        specials: this.fb.array([])
      });
      this.populateSpecials();

    }
    //add this day onto the main form
    this.mainForm.addControl(this.specialsDay, this.form);
  }

  /**
  * Invoked when the data (@Inputs) that is binded to this component by the
  * parent changes - defaults the start times for all days based on what is
  * entered for the first day
  */
  ngOnChanges(changes: SimpleChanges) {
    console.log("ngonchanges");
    //this code might need to change since the formcreation is moved to ngonint
    /** 
    let st: any = this.form.get('startTime').value;
    let et: any = this.form.get('endTime').value;
    if (st == null) {
      this.form.get('startTime').setValue(this.lastStartTime);
    }
    if (et == null) {
      this.form.get('endTime').setValue(this.lastEndTime);
    }
    */
  }

  /**
    Need to insert at runtime to set the themes
  */
  openStartPicker() {
    let timePicker = this.atp.open({
      theme: 'material-blue'
    });
    timePicker.afterClose().subscribe(time => {
      //from the angular form docs
      this.form.get('startTime').setValue(time);
    });
  }
  openEndPicker() {
    let timePicker = this.atp.open({
      theme: 'material-blue'
    });
    timePicker.afterClose().subscribe(time => {
      this.form.get('endTime').setValue(time);
    });
  }
  /**
 * Create new item for food or drink
 */
  private createNewSpecial(item : string) {
    return this.fb.group({
      itemName: [item, Validators.required]
    });
  }
  /**
 * Add new special into form as blank, called from the add more action
 *
 */
   addSpecial = (item : string) => {
    const control = <FormArray>this.form.controls['specials'];
    control.push(this.createNewSpecial(item));
  }

  private deleteSpecial(index) {
    const control = <FormArray>this.form.controls['specials'];
    control.removeAt(index);
  }

  /**
   * let the parent know we want to change tabs to next or prev day
   * @val will either be 1 or -1 if going back
  */
  private changeDailyTab(val: any) {
    let st: any = this.form.get('startTime').value;
    let et: any = this.form.get('endTime').value;
    //pass the data as an object since emit only takes 1 param
    this.changeTab.emit({ val, st, et });
  }

  //Fill the specials array based on the day when editing
  private populateSpecials = () => {
     let editSpecialsArr : [] = this.editData[this.specialsDay].specials;
     if(editSpecialsArr.length > 0) {
       editSpecialsArr.forEach((special : any, index) => {
          this.addSpecial(special.itemName);
       });
     }
  }

}
