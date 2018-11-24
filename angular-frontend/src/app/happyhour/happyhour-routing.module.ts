import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HappyhourComponent } from './happyhour.component';

const routes: Routes = [
    {
        path: '',
        component: HappyhourComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HappyHourRoutingModule { }
