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
  @Input('happyHour') happyHour: HappyHourModel;
  @Output()
  refreshContent: EventEmitter<any> = new EventEmitter<any>();

  editHappyHourDialog: MatDialogRef<HappyHourCreateModalComponent>;
  constructor(private snackbar: MatSnackBar,
    private happyhourServ: HappyhourService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  editHappyHour() {
    this.editHappyHourDialog = this.dialog.open(HappyHourCreateModalComponent, {
      hasBackdrop: false,
      closeOnNavigation: true,
      disableClose: false,
      data: this.happyHour,
      width: '900px'
    });
    this.registerModalClose();

  }

  deleteHappyHour() {
    const {name, _id} = this.happyHour
    //already pulled all of the data so just filter on the id we want to edit
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: name
      }
    });
    dialogRef.afterClosed().subscribe(answer => {
      if (answer) {
        this.happyhourServ.deleteHappyHour(_id).subscribe(result => {
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
