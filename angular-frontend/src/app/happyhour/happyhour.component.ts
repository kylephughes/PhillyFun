import { HappyHourCreateModalComponent } from './happy-hour-create-modal/happy-hour-create-modal.component';
import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-happyhour',
  templateUrl: './happyhour.component.html',
  styleUrls: ['./happyhour.component.scss']
})
export class HappyhourComponent implements OnInit {

  //our variable of our module to handle the dialog itself
  newHappyHourDialog: MatDialogRef<HappyHourCreateModalComponent>;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  
  toggleFormDialog() {
     this.newHappyHourDialog = this.dialog.open(HappyHourCreateModalComponent, {
       hasBackdrop:false
     });

     this.newHappyHourDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
