import { HappyHourCreateModalComponent } from './happy-hour-create-modal/happy-hour-create-modal.component';
import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-happyhour',
  templateUrl: './happyhour.component.html',
  styleUrls: ['./happyhour.component.scss']
})
export class HappyhourComponent implements OnInit {

  //our variable of our module to handle the dialog itself
  newHappyHourDialog: MatDialogRef<HappyHourCreateModalComponent>;
 
  constructor(private dialog: MatDialog, router : Router) { 
    //closes dialog when navigating away from this page
   router.events.subscribe( () =>  {
    dialog.closeAll();
   });
  }

  ngOnInit() {
  }
  
  toggleFormDialog() {
    //load in a new component in the dialog
     this.newHappyHourDialog = this.dialog.open(HappyHourCreateModalComponent, {
       hasBackdrop:false,
       closeOnNavigation:true,
       disableClose:false,
       width:'900px'
     });

     this.newHappyHourDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
