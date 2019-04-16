import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SocialUser } from 'angularx-social-login';
import {AuthService as GoogleAuthService} from 'angularx-social-login'
import { environment } from '../../environments/environment'


const APIURL = environment.apiUrl;
@Injectable()
export class AuthService {
  constructor(private http: HttpClient,private authService : GoogleAuthService) { }

  //use the google login credentials and just store in localStorage for now
  //eventually connect with the server for some jwt token
  login(user : any) : Observable<any>{
    if(user != null) {
      localStorage.setItem('access_token', user.authToken);
      localStorage.setItem('user', JSON.stringify(user));
      console.log("adding in servicet ");
      console.log(user);
     return this.http.post(APIURL + 'user/login', user).pipe(map(response => {
        return response;
      }));
    }
  }

  logout() {
    this.authService.signOut();
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

  getUser() {
    let user : any = localStorage.getItem('user');
    return user;
  }
}