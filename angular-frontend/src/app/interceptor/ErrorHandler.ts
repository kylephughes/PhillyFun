import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { Subject } from 'rxjs';
@Injectable()
export class ErrorHandler {
  //used by the interceptor to prevent multiple errors displaying when an
  //error is already showing in the dialog
  private cancelPendingRequests$ = new Subject<void>()
  constructor(
    private dialog: MatDialog
  ) { }

  public handleError(err: any) {
    //tell http interceptor to cancel any more requests since we already have an error
    this.cancelPendingRequests$.next()
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '300px',
      data: err
    });
  }

  //allow interceptor to 'takeUntil'
  public onCancelPendingRequests() {
    return this.cancelPendingRequests$.asObservable()
  }

}