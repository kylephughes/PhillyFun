import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AngularMaterialModule } from './angular-material/angular-material.module'
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'

import {HttpRequestInterceptor} from './interceptor/HttpRequestInterceptor';
import {ErrorHandler} from './interceptor/ErrorHandler';
import { ErrorDialogComponent } from './shared/error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';

import { SocialLoginModule,AuthServiceConfig,GoogleLoginProvider } from 'angularx-social-login';
import { getAuthServiceConfigs } from './SocialLoginConfig';
import {AuthService} from './core/auth.service';
import { LoginComponent } from './login/login.component';
import {AngularFontAwesomeModule} from './angular-fontawesome/angular-fontawesome.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EventsComponent,
    MainNavComponent,
    ErrorDialogComponent,
    ConfirmDialogComponent,
    LoginComponent
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    LayoutModule,
    FlexLayoutModule,
    AngularMaterialModule,
    SocialLoginModule,
    AngularFontAwesomeModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    ErrorHandler,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    AuthService
  ],
  bootstrap: [AppComponent],
  entryComponents : [
    ErrorDialogComponent,
    ConfirmDialogComponent,
    LoginComponent
  ]
})
export class AppModule { }
