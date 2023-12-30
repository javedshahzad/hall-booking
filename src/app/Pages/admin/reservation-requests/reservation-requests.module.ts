import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationRequestsPageRoutingModule } from './reservation-requests-routing.module';

import { ReservationRequestsPage } from './reservation-requests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservationRequestsPageRoutingModule
  ],
  declarations: [ReservationRequestsPage]
})
export class ReservationRequestsPageModule {}
