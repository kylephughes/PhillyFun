import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HappyHourModel } from 'src/app/models/HappyHourModel';
import { HappyHourCreateModalComponent } from 'src/app/happyhour/happy-hour-create-modal/happy-hour-create-modal.component';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { HappyhourService } from 'src/app/happyhour/happyhour.service';

@Component({
  selector: 'happy-hour-card',
  templateUrl: './happy-hour-card.component.html',
  styleUrls: ['./happy-hour-card.component.scss']
})
export class HappyHourCardComponent implements OnInit {
  @Input('happyHours') happyHours: HappyHourModel[];
  @Output()
  refreshContent: EventEmitter<any> = new EventEmitter<any>();

  editHappyHourDialog: MatDialogRef<HappyHourCreateModalComponent>;
  constructor(private snackbar: MatSnackBar,
    private happyhourServ: HappyhourService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  editHappyHour(obj: HappyHourModel) {
    this.editHappyHourDialog = this.dialog.open(HappyHourCreateModalComponent, {
      hasBackdrop: false,
      closeOnNavigation: true,
      disableClose: false,
      data: obj,
      width: '900px'
    });
    this.registerModalClose();

  }

  deleteHappyHour(name: string, id: string) {

    //already pulled all of the data so just filter on the id we want to edit
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: name
      }
    });
    dialogRef.afterClosed().subscribe(answer => {
      console.log("the answer " + answer)
      if (answer) {
        this.happyhourServ.deleteHappyHour(id).subscribe(result => {
          this.snackbar.open(name + " has been deleted!", 'Close',
            { duration: 6000, verticalPosition: 'top' });
        });
        this.refreshContent.emit();
      }

    });

  }

  registerModalClose = () => {
    this.editHappyHourDialog.afterClosed().subscribe(result => {
      this.refreshContent.emit();
    });
  }
}
