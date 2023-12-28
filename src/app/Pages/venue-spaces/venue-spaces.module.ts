import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VenueSpacesPageRoutingModule } from './venue-spaces-routing.module';

import { VenueSpacesPage } from './venue-spaces.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VenueSpacesPageRoutingModule
  ],
  declarations: [VenueSpacesPage]
})
export class VenueSpacesPageModule {}
