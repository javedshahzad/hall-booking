import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {
  Clients: any=[];

  constructor(private chatService: ChatService, private navCtrl: NavController) { }

  ngOnInit() {
     this.chatService.getUsers().subscribe((response:any)=>{
      console.log(response)
      this.Clients = response;
      this.Clients = this.Clients.filter(data=> data.type != 1);
    });
  }
  GotoChat(client){
    this.navCtrl.navigateForward("/chats-clients",{queryParams:{client:client}})
  }
}
