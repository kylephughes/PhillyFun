import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HappyhourComponent } from './happyhour/happyhour.component';
import { EventsComponent } from './events/events.component';
 // This is my case
const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full'
    },
    {
        path: 'about',
        component: AppComponent
    },
    {
        path: 'happyhour',
        component: HappyhourComponent
    },
    {
        path: 'events',
        component: EventsComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
