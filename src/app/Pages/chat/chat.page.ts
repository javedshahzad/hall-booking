import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  messages: any=[];
  newMsg = '';
  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit() {
    this.chatService.getChatMessages().subscribe((resposne:any)=>{
      this.content.scrollToBottom();
      console.log(resposne)
      this.messages = resposne;
    });
    
  }

  sendMessage() {
    this.chatService.addChatMessage(this.newMsg).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });
  }


}
