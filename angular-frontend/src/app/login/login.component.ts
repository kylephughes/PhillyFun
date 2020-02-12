import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  GoogleLoginProvider,
  SocialUser,
  AuthService
} from "angularx-social-login";
import { Subject, Subscription } from "rxjs";
import { AuthService as LoginAuth } from "../core/auth.service";
import { User } from "../models/User";
import { MatDialogRef } from "@angular/material";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(
    private loginAuth: LoginAuth,
    private authService: AuthService,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {}
  user: User;
  //need to remove subscription to prevent memory leaks
  googleResponse: Subscription;

  ngOnInit() {
    // listen for updates to user
    this.loginAuth.user$.subscribe(user => {
      this.user = user;
    });
    //this will return null if the  user is logged out and push something when this component first loads
    this.googleResponse = this.authService.authState.subscribe(user => {
      //send request to rest api
      if (user != null) {
        this.loginAuth.login(user).subscribe(response => {
          this.dialogRef.close();
        });
      }
    });
  }

  ngOnDestroy() {
    this.googleResponse.unsubscribe();
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
