import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-view-hall',
  templateUrl: './view-hall.page.html',
  styleUrls: ['./view-hall.page.scss'],
})
export class ViewHallPage implements OnInit {
  hallDetails: any={};
  IsReservation:boolean=false;
  hallReserveFrom:any;
  hallReserveTo:any;
  constructor(public angularFireStore: AngularFirestore, public Activerouter: ActivatedRoute,
    private navCtrl:NavController,
    private restSr:RestApiService
    ){
      this.Activerouter.queryParams.subscribe((response:any)=>{
        console.log(response)
        if(response.hallDetails){
          this.hallDetails = response.hallDetails;
        }
       
      })
     }

  ngOnInit() {
  }
  reserveNow(hallDetails){
    this.IsReservation=true;
  }
  requestNow(hallDetails){
   if(this.hallReserveFrom && this.hallReserveTo){
    this.restSr.showLoader();
    var user = JSON.parse(localStorage.getItem("userData")) ? JSON.parse(localStorage.getItem("userData")) : "";
    console.log(user)
    let today = new Date();

    this.hallDetails.hallReserveFrom = this.hallReserveFrom;
    this.hallDetails.hallReserveTo = this.hallReserveTo;
    this.hallDetails.isApprovedByAdmin = "Pending";
    this.hallDetails.user = user;
    this.hallDetails.userId = user.userId;
    this.hallDetails.createdAt = today;
      this.angularFireStore.collection("reservation").add(this.hallDetails).then((respone:any)=>{
        this.angularFireStore.collection('reservation').doc(respone.id).update({
          'reservationId': respone.id
      });
      this.restSr.hideLoader();
      this.restSr.toast("Hall has been reserved successfully!");
      this.navCtrl.navigateBack("/home")
      })
    }
  }
}
