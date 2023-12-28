import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrecinctMapPage } from './precinct-map.page';

const routes: Routes = [
  {
    path: '',
    component: PrecinctMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrecinctMapPageRoutingModule {}
