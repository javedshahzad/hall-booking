import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-plan-an-event',
  templateUrl: './plan-an-event.page.html',
  styleUrls: ['./plan-an-event.page.scss'],
})
export class PlanAnEventPage implements OnInit {
  eventData:any={};
  constructor( public restSr:RestApiService, private navCtrl:NavController,
    private activeRoute:ActivatedRoute,
     private angularFireStore:AngularFirestore,)
      { }

  ngOnInit() {
  }
  CreateNow(){
    var user = JSON.parse(localStorage.getItem("userData")) ? JSON.parse(localStorage.getItem("userData")) : "";
    console.log(user)
    this.restSr.showLoader();
    if(this.eventData.eventAgenda && this.eventData.eventSpeakers && this.eventData.eventDate && this.eventData.eventUpdates){
      let today = new Date();
      this.eventData.createdAt = today;
      this.eventData.userId=user.userId;
      this.eventData.user=user;
      this.angularFireStore.collection("events").add(this.eventData).then((respone:any)=>{
        this.angularFireStore.collection('events').doc(respone.id).update({
          'eventId': respone.id
      });
      this.restSr.hideLoader();
      this.restSr.toast("Your event has been added successfully!");
      this.navCtrl.navigateBack("/home")
      })
    }
  }
}
