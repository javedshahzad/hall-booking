import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/firestore';
import { Observable, map, switchMap } from 'rxjs';
export interface Message {
  createdAt: firebase.FieldValue;
  id: string;
  from: string;
  msg: string;
  fromName: string;
  fromEmail: string;
  to:string;
  myMsg: boolean;
}
export interface User {
  userId: string;
  email: string;
  name:string;
}
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  currentUser: any;
  Admin: any={};

  constructor(   private angularFireStore:AngularFirestore,) { 
    var user = JSON.parse(localStorage.getItem("userData")) ? JSON.parse(localStorage.getItem("userData")) : "";
    this.currentUser = user
    this.getUsers().subscribe((reponse:any)=>{
      var admin = reponse.filter(data=> data.type === 1);
      this.Admin = admin[0];
      console.log(this.Admin)
    })
  }
  // Chat functionality

addChatMessage(msg,client?:any) {
  if(this.currentUser.type != 1){
    return this.angularFireStore.collection('messages').add({
      msg: msg,
      from: this.currentUser.userId,
      to:this.Admin.userId,
      createdAt: firebase.serverTimestamp()
    });
  }else{
    return this.angularFireStore.collection('messages').add({
      msg: msg,
      from: this.currentUser.userId,
      to:client.userId,
      createdAt: firebase.serverTimestamp()
    });
  }

}

getChatMessages(client?:any) {
  console.log(client)
  let users = [];
  return this.getUsers().pipe(
    switchMap(res => {
      users = res;
      var Admin = users.filter(data=> data.type === 1);
      return this.angularFireStore.collection('messages', ref => ref.orderBy('createdAt')).valueChanges({ idField: 'id' }) as Observable<Message[]>;
    }),
    map(messages => {
      var messagesarray = messages
      // Get the real name for each user
      if(this.currentUser.type != 1){
        let messgs = messages.filter(data => data.from === this.currentUser.userId && data.to === this.Admin.userId || data.from === this.Admin.userId && data.to === this.currentUser.userId)
        messagesarray = messgs;
      }
      if(this.currentUser.type === 1){
        let messgs = messages.filter(data => data.from === this.currentUser?.userId && data.to === client?.userId || data.from === client?.userId && data.to === this.currentUser.userId)
        messagesarray = messgs;
      }
      for (let m of messagesarray) {
        m.fromName = this.getUserForMsg(m.from, users);
        m.fromEmail = this.getUserForEmail(m.from, users)
        m.myMsg = this.currentUser.userId === m.from;
      }
      return messagesarray
    })
  )
}

public getUsers() {
  return this.angularFireStore.collection('users').valueChanges({ idField: 'userId' }) as Observable<User[]>;
}

private getUserForMsg(msgFromId, users: User[]): string {
  for (let usr of users) {
    if (usr.userId == msgFromId) {
      return usr.name;
    }
  }
  return 'Deleted';
}
private getUserForEmail(msgFromId, users: User[]): string {
  for (let usr of users) {
    if (usr.userId == msgFromId) {
      return usr.email;
    }
  }
  return 'Deleted';
}
}
