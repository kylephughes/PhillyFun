import { Component, NgZone, OnInit, ViewChild} from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'] 
})
export class MainNavComponent implements OnInit{
  //isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
    width;
    height;
    mode:string = 'side';
    open = 'true';
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  constructor(public ngZone:NgZone,private _router:Router) {
  
  
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

