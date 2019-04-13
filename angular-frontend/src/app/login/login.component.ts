import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from "angularx-social-login";
import {GoogleLoginProvider,SocialUser } from "angularx-social-login";
import { Subject, Subscription } from 'rxjs';
import {AuthService as LoginAuth} from '../core/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginAuth : LoginAuth,private authService: AuthService) { }
  user : SocialUser;
  //need to remove subscription to prevent memory leaks
  googleResponse : Subscription;
  
  ngOnInit() {
    //if you don't logout, this will return something automatically. Must store it in localStorage
    this.googleResponse = this.authService.authState.subscribe((user) => {
      console.log("Received something from google ");
      //send request to rest api
      this.loginAuth.login(user);
      this.user=user;
    });
  }

  ngOnDestroy() {
    this.googleResponse.unsubscribe();
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

}
