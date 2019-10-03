import { HappyHourCreateModalComponent } from './happy-hour-create-modal/happy-hour-create-modal.component';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { HappyhourService } from './happyhour.service'
import { HappyHourModel } from '../models/HappyHourModel';

@Component({
  selector: 'app-happyhour',
  templateUrl: './happyhour.component.html',
  styleUrls: ['./happyhour.component.scss']
})
export class HappyhourComponent implements OnInit {
  //keep  philly city hall for now TODO use location
  latitude = 40.8259;
  longitude= -74.2090;
  showMap : boolean = false;
  today: number = Date.now();
  //our variable of our module to handle the dialog itself
  newHappyHourDialog: MatDialogRef<HappyHourCreateModalComponent>;
  //used for async pipe in html
  happyHours$: Observable<HappyHourModel[]>;
  //store them in a format this class can use 
  happyHoursArr : HappyHourModel[];
  constructor(private dialog: MatDialog, router: Router, 
            private happyhourServ: HappyhourService) {
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
  
  //handle selecting a place on the map TODO
  selectMarker(event,name: string) {
    alert("Selected " + name);
  }

  //In new or edit mode, refresh the list
  registerModalClose = () => {
    this.newHappyHourDialog.afterClosed().subscribe(result => {
      this.refreshComponent();
    });
  }

}