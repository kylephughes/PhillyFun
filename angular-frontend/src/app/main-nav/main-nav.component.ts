import { Component, NgZone, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';
import { Router, NavigationCancel, NavigationEnd, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'] 
})
export class MainNavComponent implements OnInit,AfterViewInit {
  //isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
    width;
    height;
    mode:string = 'side';
    open = 'true';

    //since we lazy load child components, show a loading indicator while we click a link
    loadingChild : boolean;
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  constructor(public ngZone:NgZone,private _router:Router) {
  
      this.loadingChild = true;
      this.changeMode();
    //ngzone runs outside of angular
        window.onresize = (e) => {
            ngZone.run(() => {
                this.changeMode();
            });
        };
  }
  
  
    ngOnInit() {
      //close the sidenav when navigating to a route
      this._router.events.subscribe(() => {
        this.sidenav.close();  
     });
   }

   //look into doing this inside of ngzone, right now it shows up but it looks like the screen
   //is frozen until the module loads
   ngAfterViewInit() {
    this._router.events
        .subscribe((event) => {
            if(event instanceof NavigationStart) {
                this.loadingChild = true;
            }
            else if (
                event instanceof NavigationEnd || 
                event instanceof NavigationCancel
                ) {
                this.loadingChild = false;
            }
        });
}
  
  
   /**
   * probably don't need this anymore but it shows the sidenav or adds the backdrop
   * depending on the size
   */
  changeMode() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        if(this.width <= 700) {
            this.mode = 'over';
            //this.open = 'false';
        }
        if(this.width > 700) {
            this.mode = 'side';
            //this.open = 'true';
        }
    }
  
  }

