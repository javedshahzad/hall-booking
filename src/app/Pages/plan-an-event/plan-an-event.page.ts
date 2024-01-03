import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RestApiService } from 'src/app/services/rest-api.service';
import {formatDistance} from 'date-fns/formatDistance';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-plan-an-event',
  templateUrl: './plan-an-event.page.html',
  styleUrls: ['./plan-an-event.page.scss'],
})
export class PlanAnEventPage implements OnInit {
  eventData:any={};
  image_url: any;
  AllHallList: any=[];
  constructor( public restSr:RestApiService, private navCtrl:NavController,
    private activeRoute:ActivatedRoute,
    private firebaseStorage:AngularFireStorage,
     private angularFireStore:AngularFirestore,)
      { }

  ngOnInit() {
    this.getAllHalls()
  }
  getAllHalls(){
    this.restSr.showLoader()
    this.angularFireStore.collection("hall").valueChanges().subscribe((response:any)=>{
      this.AllHallList = response;
      this.AllHallList = this.AllHallList.filter(d=>d.hallStatus === "Available");
      console.log(this.AllHallList)
      this.restSr.hideLoader()
    })
  }
  CreateNow(){
    var user = JSON.parse(localStorage.getItem("userData")) ? JSON.parse(localStorage.getItem("userData")) : "";
    console.log(user)
  
    if(this.eventData.eventAgenda && this.eventData.eventSpeakers 
      && this.eventData.eventHall && this.eventData.eventUpdates
       && this.eventData.eventRegisterationForAttendes
       && this.eventData.eventStartDate && this.eventData.eventEndDate){
        var dateTime:any = formatDistance(new Date(this.eventData.eventStartDate), new Date(this.eventData.eventEndDate), {
          addSuffix: false
        })
        
        console.log(dateTime.charAt(0))
        if(dateTime.charAt(0) >= 7){
          this.restSr.showLoader();
      let today = new Date();
      this.eventData.createdAt = today;
      this.eventData.userId=user.userId;
      this.eventData.user=user;
      this.eventData.eventImageUrl = this.image_url;
  
      this.angularFireStore.collection("events").add(this.eventData).then((respone:any)=>{
        this.angularFireStore.collection('events').doc(respone.id).update({
          'eventId': respone.id
      });
      this.restSr.hideLoader();
      this.restSr.toast("Your event has been added successfully!");
      this.navCtrl.navigateBack("/home")
      })
        }else{
          this.restSr.toastError("You cannot book an event less than 7 days!")
        }
      
    }else{
      this.restSr.toastError("Please fill all fields to continue!")
    }
  }
  OnUploadImage($event)
  {
    let file = $event.target.files[0];
    this.restSr.showSimpleLoader();
      let ref = this.firebaseStorage.ref('uploads/'+ file.name);
      ref.put(file).then(res=>{
        ref.getDownloadURL().subscribe(url =>{
          this.restSr.toast("Image Uploaded")
          
          this.image_url=url;
          console.log(this.image_url);
          this.restSr.hideLoader();
       
        });
      }).catch(err=>{
        console.log(err);
      })
  }
}
