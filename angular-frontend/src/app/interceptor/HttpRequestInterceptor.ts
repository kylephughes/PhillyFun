import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError, empty } from 'rxjs';
import { map, catchError, takeUntil } from 'rxjs/operators';

import { ErrorHandler } from './ErrorHandler';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    public errorHandler: ErrorHandler,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //Catch any bad responses from the express server and set things up for handling JWT
    //takeUntil waits for something to be emitted and then will stop (meaning an error already occurred)
    return next.handle(request).pipe(takeUntil(this.errorHandler.onCancelPendingRequests()),
      map((event: HttpEvent<any>) => {
        //if (event instanceof HttpResponse) {
        // console.log('event--->>>', event);
        //}
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let data = {};
        data = {
          reason: error && error.error ? error.error : '',
          status: error.status
        };
        //TODO look into removing the material progress bar when there is an error!
        this.errorHandler.handleError(data);
        return throwError(error);
      }));
  }
}