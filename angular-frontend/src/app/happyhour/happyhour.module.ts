import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HappyHourCreateModalComponent } from './happy-hour-create-modal/happy-hour-create-modal.component';
import { HappyhourComponent } from './happyhour.component';
import { DailySpecialsCardComponent } from './daily-specials-card/daily-specials-card.component';
import { HappyHourRoutingModule} from './happyhour-routing.module'
import { HappyhourService } from './happyhour.service';
import { AngularMaterialModule } from '../angular-material/angular-material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import {AmazingTimePickerModule} from 'amazing-time-picker';
import {FlexLayoutModule} from '@angular/flex-layout';
//google maps
import { AgmCoreModule } from '@agm/core';
import {environment} from '../../environments/environment';
import {HappyHourCardComponent} from '../components/happy-hour-card/happy-hour-card.component';
import { SearchPipe} from '../shared/pipes/search.pipe';

@NgModule({
  declarations: [
    HappyHourCreateModalComponent,
    HappyhourComponent,
    DailySpecialsCardComponent,
    HappyHourCardComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    HappyHourRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    AmazingTimePickerModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleKey
    })
  ],
  providers : [
    HappyhourService,
  ],
  exports: [
  ],
  //needed since it is inserted at runtime
  entryComponents: [HappyHourCreateModalComponent]
})
export class HappyHourModule { }
