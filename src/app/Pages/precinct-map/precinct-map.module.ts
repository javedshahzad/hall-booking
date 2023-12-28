import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrecinctMapPageRoutingModule } from './precinct-map-routing.module';

import { PrecinctMapPage } from './precinct-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrecinctMapPageRoutingModule
  ],
  declarations: [PrecinctMapPage]
})
export class PrecinctMapPageModule {}
