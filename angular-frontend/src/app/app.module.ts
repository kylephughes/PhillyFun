import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//JS bootstrap 4 functions
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HappyhourComponent } from './happyhour/happyhour.component';
import { EventsComponent } from './events/events.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { HappyHourCreateModalComponent } from './happyhour/happy-hour-create-modal/happy-hour-create-modal.component';
//needed for modals in material?
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {MatFormFieldModule, MatInputModule,MatDialogModule,MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HappyhourComponent,
    EventsComponent,
    HappyHourCreateModalComponent,
    MainNavComponent
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
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  //needed since it is inserted at runtime
  entryComponents: [HappyHourCreateModalComponent]
})
export class AppModule { }
