import { HappyHourCreateModalComponent } from './happy-hour-create-modal/happy-hour-create-modal.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { HappyhourService } from './happyhour.service'
import { HappyHourModel } from '../models/HappyHourModel';
@Component({
  selector: 'app-happyhour',
  templateUrl: './happyhour.component.html',
  styleUrls: ['./happyhour.component.scss']
})
export class HappyhourComponent implements OnInit {

  //our variable of our module to handle the dialog itself
  newHappyHourDialog: MatDialogRef<HappyHourCreateModalComponent>;
  happyHours: Observable<HappyHourModel[]>;
  constructor(private dialog: MatDialog, router: Router, private happyhourServ: HappyhourService) {
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
    //async pipe makes the http request return twice? weird occurrence
    this.happyHours = this.happyhourServ.getHappyHours();
  }

  toggleFormDialog() {
    //The dialog uses this model to populate form fields in edit mode so default it for new
    let editData: HappyHourModel = new HappyHourModel();
    this.newHappyHourDialog = this.dialog.open(HappyHourCreateModalComponent, {
      hasBackdrop: false,
      closeOnNavigation: true,
      disableClose: false,
      width: '900px',
      data: editData
    });
    this.registerModalClose();
  }
  editHappyHour(id: string) {

    let happyHour = this.happyhourServ.getHappyHour(id);
    happyHour.subscribe((editData: HappyHourModel[]) => {
      //send edit data to the modal (eventually rename the component modal)
      this.newHappyHourDialog = this.dialog.open(HappyHourCreateModalComponent, {
        hasBackdrop: false,
        closeOnNavigation: true,
        disableClose: false,
        data: editData,
        width: '900px'
      });
    });
    this.registerModalClose();
  }

  /**
   * In new or edit mode, refresh the list
   */
  registerModalClose = () => {
    alert("modal close");
    this.newHappyHourDialog.afterClosed().subscribe(result => {
      this.refreshComponent();
    });
  }

}