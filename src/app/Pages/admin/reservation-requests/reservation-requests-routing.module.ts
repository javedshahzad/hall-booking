import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationRequestsPage } from './reservation-requests.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationRequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationRequestsPageRoutingModule {}
