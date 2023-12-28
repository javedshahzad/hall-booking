import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanAnEventPageRoutingModule } from './plan-an-event-routing.module';

import { PlanAnEventPage } from './plan-an-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanAnEventPageRoutingModule
  ],
  declarations: [PlanAnEventPage]
})
export class PlanAnEventPageModule {}
