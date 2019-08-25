import { Component, OnInit, OnDestroy } from '@angular/core';
import {GoogleLoginProvider,SocialUser, AuthService } from "angularx-social-login";
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
    //this will return null if the  user is logged out and push something when this component first loads
    this.googleResponse = this.authService.authState.subscribe((user) => {
      //send request to rest api
      if(user != null) {
        this.loginAuth.login(user).subscribe(response => {
          console.log(response);
        });
      }
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
