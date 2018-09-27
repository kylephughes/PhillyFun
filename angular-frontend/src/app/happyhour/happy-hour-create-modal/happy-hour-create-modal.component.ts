import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { MatVerticalStepper, MatFormField, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-happy-hour-create-modal',
  templateUrl: './happy-hour-create-modal.component.html',
  styleUrls: ['./happy-hour-create-modal.component.scss']
})
export class HappyHourCreateModalComponent implements OnInit {

    form: FormGroup;

    constructor(private formBuilder:FormBuilder){
      
    }

    ngOnInit() {
      this.form = this.formBuilder.group({
        barName : ['',Validators.required],
        experience : ['',Validators.required],
        floatLabel : 'auto'
      });
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
