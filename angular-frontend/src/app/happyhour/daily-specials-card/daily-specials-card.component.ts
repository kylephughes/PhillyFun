import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'daily-specials-card',
  templateUrl: './daily-specials-card.component.html',
  styleUrls: ['./daily-specials-card.component.scss']
})
export class DailySpecialsCardComponent implements OnInit {
  //send the data to to the parent via this event
  @Output()
  private formReady: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output()
  private changeTab: EventEmitter<any> = new EventEmitter<any>();
  //accept a variable when called
  @Input('specialsDay')
  private specialsDay: any;
  private form: FormGroup;
  constructor(private fb: FormBuilder) {
    //each day has its own specials
    this.form = this.fb.group({
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
 * Create new item for food or drink
 */
  private createNewSpecial() {
    return this.fb.group({
      itemName: ['', Validators.required],
      itemPrice: [1, [Validators.required]],
      itemQty: [''],
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
    this.changeTab.emit(val);
  }

}
