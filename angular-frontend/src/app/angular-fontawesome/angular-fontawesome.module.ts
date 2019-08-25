import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas,faCoffee,faSignInAlt,faSignOutAlt,faUserAlt } from '@fortawesome/free-solid-svg-icons';

@NgModule({

  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  providers: [],
})
export class AngularFontAwesomeModule {
  constructor() {
    // Add all to the library for convenient access in other components
    library.add(fas,faCoffee,faSignInAlt,faSignOutAlt,faUserAlt);
  }
}