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

  //made async work (it needs to have an observable and it has to be an iterable like an array)
  getHappyHours(): Observable<any[]> {
    return this.http.get(APIURL + 'happyhour').map(response => { 
      let resp : any = response;
      console.log(resp);
      return resp.data;
    });

  }

  postNewHappyHour(data): Observable<any> {
    return this.http.post(APIURL + 'happyhour', data).map(response => {
      return response;
    });

  }
}
