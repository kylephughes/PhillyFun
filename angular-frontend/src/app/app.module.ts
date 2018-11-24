import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//JS bootstrap 4 functions
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { HappyhourComponent } from './happyhour/happyhour.component';
import { EventsComponent } from './events/events.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//needed for modals in material?
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AngularMaterialModule } from './angular-material/angular-material.module'
//import {HappyHourModule} from './happyhour/happyhour.module'
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EventsComponent,
    MainNavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    LayoutModule,
    FlexLayoutModule,
    AngularMaterialModule,
    //HappyHourModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
