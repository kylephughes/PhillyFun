import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-happy-hour-create-modal',
  templateUrl: './happy-hour-create-modal.component.html',
  styleUrls: ['./happy-hour-create-modal.component.scss']
})
export class HappyHourCreateModalComponent implements OnInit {

 
    //form: FormGroup;
    description:string;

    constructor(){
      
    }

    ngOnInit() {

    }


    save() {
        //this.dialogRef.close("hllo");
    }

    close() {
       //this.dialogRef.close();
    }
}
