import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import {
  AuthService as GoogleAuthService,
  GoogleLoginProvider
} from "angularx-social-login";
import { environment } from "../../environments/environment";
import { User } from "../models/User";

const APIURL = environment.apiUrl;
@Injectable()
export class AuthService {
  private _userSubject: BehaviorSubject<User>;
  public user$: Observable<User>;
  constructor(
    private http: HttpClient,
    private googleProvider: GoogleAuthService
  ) {
    // allow components to listen for changes to user, initialize with user in local storage
    this._userSubject = new BehaviorSubject<User>(JSON.parse(this.getUser()));
    this.user$ = this._userSubject.asObservable();
  }

  //use the google login credentials and just store in localStorage for now
  //eventually connect with the server for some jwt token
  login(user: any): Observable<any> {
    if (user != null) {
      localStorage.setItem("access_token", user.authToken);
      return this.http.post(APIURL + "user/login", user).pipe(
        map((response: any) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          this._userSubject.next(response.data);
        })
      );
    }
  }

  logout() {
    //signout from provider to prevent caching your google credentials and allow you to login as a
    //different google user
    this.googleProvider.signOut(true);
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    // clear user
    this._userSubject.next(new User());
  }

  public get loggedIn(): boolean {
    return localStorage.getItem("access_token") !== null;
  }

  getUser() {
    return localStorage.getItem("user");
  }
}
