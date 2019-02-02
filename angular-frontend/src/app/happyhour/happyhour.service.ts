import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment'



const APIURL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class HappyhourService {

  constructor(private http: HttpClient) { }

  getTestApi(): Observable<any> {
    return this.http.get(APIURL + 'happyhour').map(response => {
      console.log("got to t he iapi" + JSON.stringify(response));
      return response;
    });

  }

  postNewHappyHour(data): Observable<any> {
    return this.http.post(APIURL + 'happyhour', data).map(response => {
      console.log("got to t he iapi" + JSON.stringify(response));
      return response;
    });

  }
}
