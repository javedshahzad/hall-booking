import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatsClientsPage } from './chats-clients.page';

const routes: Routes = [
  {
    path: '',
    component: ChatsClientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatsClientsPageRoutingModule {}
