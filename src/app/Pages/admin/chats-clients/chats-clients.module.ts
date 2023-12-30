import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatsClientsPageRoutingModule } from './chats-clients-routing.module';

import { ChatsClientsPage } from './chats-clients.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatsClientsPageRoutingModule
  ],
  declarations: [ChatsClientsPage]
})
export class ChatsClientsPageModule {}
