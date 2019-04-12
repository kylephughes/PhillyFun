import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import {GoogleLoginProvider,SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService) { }
  user : SocialUser;
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      console.log("Received something from google ");
      console.log(user);
      this.user=user;
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    console.log("after signin");
  }

}
