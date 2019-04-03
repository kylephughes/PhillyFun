import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment'
import { HappyHourModel } from '../models/HappyHourModel';


const APIURL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class HappyhourService {

  updateHappyHour(id: string, data: HappyHourModel): Observable<any> {
    return this.http.put(APIURL + 'happyhour/'+id, data).map(response => {
      console.log( response);
      return response;
    });
  }

  constructor(private http: HttpClient) { }

  //made async work (it needs to have an observable and it has to be an iterable like an array)
  getHappyHours(): Observable<HappyHourModel[]> {
    return this.http.get(APIURL + 'happyhour').map(response => {
      //some reason this loops over twice
      let resp: any = response || {};
      console.log( resp.data);
      return resp.data;
    });

  }

  getHappyHour(id: string): Observable<HappyHourModel[]> {
    return this.http.get(APIURL + 'happyhour/' + id).map(response => {
      let resp: any = response;

      //data should fit to the model
      return resp.data;
    });

  }

  postNewHappyHour(data): Observable<any> {
    return this.http.post(APIURL + 'happyhour', data).map(response => {
      return response;
    });

  }

  deleteHappyHour(id : string) : Observable<any> {
    console.log("DELETEING " + id);
    return this.http.delete(APIURL + 'happyhour/' +id).map(response => {
      return response;
    })
  }
}
