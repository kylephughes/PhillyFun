import { Component, NgZone, ViewChild, OnInit } from "@angular/core";
import { MatSidenav, MatDialog, MatDialogRef } from "@angular/material";
import {
  Router,
  NavigationCancel,
  NavigationEnd,
  NavigationStart
} from "@angular/router";
import { AuthService } from "../core/auth.service";
import { LoginComponent } from "../login/login.component";
import { SocialUser } from "angularx-social-login";
import { User } from "../models/User";
@Component({
  selector: "app-main-nav",
  templateUrl: "./main-nav.component.html",
  styleUrls: ["./main-nav.component.scss"]
})
export class MainNavComponent implements OnInit {
  //isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  width;
  height;
  mode: string = "side";
  open = "true";
  loginDialog: MatDialogRef<LoginComponent>;
  user: User;
  loggedIn: boolean;
  //since we lazy load child components, show a loading indicator while we click a link
  loadingChild: boolean;
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    public ngZone: NgZone,
    private _router: Router
  ) {
    this.loadingChild = false;
    this.changeMode();
    //ngzone runs outside of angular
    window.onresize = e => {
      ngZone.run(() => {
        this.changeMode();
      });
    };

    this._router.events.subscribe(event => {
      this.sidenav.close();
      //loading added for lazy modules
      if (event instanceof NavigationStart) {
        this.loadingChild = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel
      ) {
        this.loadingChild = false;
      }
    });
  }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.loggedIn = true;
      this.user = user;
    });
  }

  /**
   * probably don't need this anymore but it shows the sidenav or adds the backdrop
   * depending on the size
   */
  changeMode() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    if (this.width <= 700) {
      this.mode = "over";
    }
    if (this.width > 700) {
      this.mode = "side";
    }
  }

  login() {
    this.loginDialog = this.dialog.open(LoginComponent, {
      hasBackdrop: false,
      closeOnNavigation: true,
      disableClose: false,
      width: "600px"
    });
  }

  logout() {
    this.auth.logout();
    this.loggedIn = false;
    this.user = null;
    this._router.navigateByUrl("/");
  }

  viewProfile() {
    //set up a profile page for the user
    this._router.navigateByUrl("/");
  }
}
