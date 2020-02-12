import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HappyhourComponent } from './happyhour.component';
import { HappyhourViewComponent } from '../components/happyhour-view/happyhour-view.component'
const routes: Routes = [
    {
        path: '',
        component: HappyhourComponent
    },
    {
      path: ':id',
      component: HappyhourViewComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HappyHourRoutingModule { }
