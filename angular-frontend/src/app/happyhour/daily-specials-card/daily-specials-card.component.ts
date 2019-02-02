import { Component, OnInit, SimpleChanges, OnChanges, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AmazingTimePickerService } from 'amazing-time-picker';


@Component({
  selector: 'daily-specials-card',
  templateUrl: './daily-specials-card.component.html',
  styleUrls: ['./daily-specials-card.component.scss']
})
export class DailySpecialsCardComponent implements OnInit, OnChanges {
  //send the data to to the parent via this event
  @Output()
  private formReady: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
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
  private form: FormGroup;

  constructor(private fb: FormBuilder, private atp: AmazingTimePickerService) {
    //each day has its own specials and times
    this.form = this.fb.group({
      startTime: [this.lastStartTime, ''],
      endTime: [this.lastEndTime, ''],
      dayOfWeek: [this.specialsDay],
      specials: this.fb.array([
        this.createNewSpecial()
      ])
    });
  }

  ngOnInit() {
    this.formReady.emit(this.form);
  }

  /**
  * Invoked when the data (@Inputs) that is binded to this component by the
  * parent changes - defaults the start times for all days based on what is
  * entered for the first day
  */
  ngOnChanges(changes: SimpleChanges) {
    let st: any = this.form.get('startTime').value;
    let et: any = this.form.get('endTime').value;
    if (st == null) {
      this.form.get('startTime').setValue(this.lastStartTime);
    }
    if (et == null) {
      this.form.get('endTime').setValue(this.lastEndTime);
    }
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
  private createNewSpecial() {
    return this.fb.group({
      itemName: ['', Validators.required]
    });
  }
  /**
 * Add new special into form as blank, called from the add more action
 *
 */
  private addSpecial() {
    const control = <FormArray>this.form.controls['specials'];
    control.push(this.createNewSpecial());
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

}
