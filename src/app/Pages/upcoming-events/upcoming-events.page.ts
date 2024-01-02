import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.page.html',
  styleUrls: ['./upcoming-events.page.scss'],
})
export class UpcomingEventsPage implements OnInit {
  AllEvents: any=[];
  constructor(public angularFireStore: AngularFirestore, public Activerouter: ActivatedRoute,
    private navCtrl:NavController,
    private restSr:RestApiService
    ) { }

  ngOnInit() {
    this.GetAllEvents();
  }
  async GetAllEvents(){
    this.restSr.showLoader()
    try {
      var user = JSON.parse(localStorage.getItem("userData")) ? JSON.parse(localStorage.getItem("userData")) : "";
      console.log(user)
      const eventDB = await this.angularFireStore.collection('events',res => {
        return res.orderBy('createdAt','desc')})
      const eventData = await eventDB.valueChanges()
      eventData.subscribe((response:any) =>{
        this.AllEvents = response;
        console.log(this.AllEvents)
        this.restSr.hideLoader()
      })
    } catch (error) {
      this.restSr.hideLoader()
      console.log(error)
    }
  }
  async registerationForAttendees(eventData){
    var user = JSON.parse(localStorage.getItem("userData")) ? JSON.parse(localStorage.getItem("userData")) : "";
    console.log(user)
    if(user.name){
      this.restSr.showLoader()
      const eventRegistDB = await this.angularFireStore.collection('eventRegisteredAttendees',res => {
        return res.orderBy('createdAt','desc').where("userId","==",user.userId).where("eventId","==",eventData.eventId)})
      const eventRegData = await eventRegistDB.valueChanges()
       let eventsubs= eventRegData.subscribe((response:any) =>{

        console.log(response)
       if(response.length > 0){
        this.restSr.hideLoader();
        eventsubs.unsubscribe();
        this.restSr.toast("You already registered with this event!");
       }else{
        let today = new Date();
        eventData.createdAt = today;
        eventData.userId=user.userId;
        eventData.user=user;
        eventsubs.unsubscribe();
        this.angularFireStore.collection("eventRegisteredAttendees").add(eventData).then((respone:any)=>{
          this.angularFireStore.collection('eventRegisteredAttendees').doc(respone.id).update({
            'RegisteredAttendeesId': respone.id
        });
        this.restSr.toast("You are registered with this event!");
        this.restSr.hideLoader();
       
        })
       }
        
      })
  
    }else{
      this.restSr.toast("Please login first to get register with this event!");
      this.navCtrl.navigateBack("/login")
    }
  }
}
