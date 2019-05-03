import { HappyHourCreateModalComponent } from './happy-hour-create-modal/happy-hour-create-modal.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { HappyhourService } from './happyhour.service'
import { HappyHourModel } from '../models/HappyHourModel';
import {ConfirmDialogComponent} from '../shared/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-happyhour',
  templateUrl: './happyhour.component.html',
  styleUrls: ['./happyhour.component.scss']
})
export class HappyhourComponent implements OnInit {
  //keep  philly city hall for now
  latitude = 39.9524;
  longitude= -75.1636;
  showMap : boolean = false;
  today: number = Date.now();
  //our variable of our module to handle the dialog itself
  newHappyHourDialog: MatDialogRef<HappyHourCreateModalComponent>;
  //used for async pipe in html
  happyHours$: Observable<HappyHourModel[]>;
  //store them in a format this class can use 
  happyHoursArr : HappyHourModel[];
  constructor( private snackbar: MatSnackBar,
    private dialog: MatDialog, router: Router, private happyhourServ: HappyhourService) {
    //closes dialog when navigating away from this page
    router.events.subscribe(() => {
      dialog.closeAll();
    });
  }

  ngOnInit() {
    this.refreshComponent();

  }

  refreshComponent () {
    //service returns the observable for the async pipe
    this.happyHours$ = this.happyhourServ.getHappyHours();
    //originall had another subscribe here to store the arr locally (caused another http request) 
    //but now just pass the full object to the edit and delete
  }

  toggleFormDialog() {
    //The dialog uses this model to populate form fields in edit mode so default it for new
    let defaultData: HappyHourModel = new HappyHourModel();
    this.newHappyHourDialog = this.dialog.open(HappyHourCreateModalComponent, {
      hasBackdrop: false,
      closeOnNavigation: true,
      disableClose: false,
      width: '900px',
      data: defaultData
    });
    this.registerModalClose();
  }

  toggleMap(){
    this.showMap = !this.showMap;
  }
  
  selectMarker(event,name: string) {
    console.log(event);
    alert("Selected " + name);
  }
  /**
   * In new or edit mode, refresh the list
   */
  registerModalClose = () => {
    this.newHappyHourDialog.afterClosed().subscribe(result => {
      this.refreshComponent();
    });
  }

}