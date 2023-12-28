import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanAnEventPage } from './plan-an-event.page';

const routes: Routes = [
  {
    path: '',
    component: PlanAnEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanAnEventPageRoutingModule {}
