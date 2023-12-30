import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chats-clients',
  templateUrl: './chats-clients.page.html',
  styleUrls: ['./chats-clients.page.scss'],
})
export class ChatsClientsPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  messages: any = [];
  newMsg = '';
  client: any={};
  constructor(private chatService: ChatService, private router: Router, private activeRoute:ActivatedRoute) {
    this.activeRoute.queryParams.subscribe((response:any)=>{
      console.log(response)
      if(response.client){
        this.client = response.client;
        console.log(this.client)
        this.getMessages()
      }
     
    })
   }

  ngOnInit() {

    
  }
getMessages(){
  this.chatService.getChatMessages(this.client).subscribe((resposne:any)=>{
    console.log(resposne)
    this.messages = resposne;
  });
}
  sendMessage() {
    this.chatService.addChatMessage(this.newMsg,this.client).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });
  }



}
