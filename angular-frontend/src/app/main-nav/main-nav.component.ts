import { Component, NgZone, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router, NavigationCancel, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'] 
})
export class MainNavComponent {
  //isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
    width;
    height;
    mode:string = 'side';
    open = 'true';

    //since we lazy load child components, show a loading indicator while we click a link
    loadingChild : boolean;
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  constructor(public ngZone:NgZone,private _router:Router) {
  
      this.loadingChild = false;
      this.changeMode();
    //ngzone runs outside of angular
        window.onresize = (e) => {
            ngZone.run(() => {
                this.changeMode();
            });
        };

        this._router.events
        .subscribe((event) => {
            this.sidenav.close(); 
            //loading added for lazy modules
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

