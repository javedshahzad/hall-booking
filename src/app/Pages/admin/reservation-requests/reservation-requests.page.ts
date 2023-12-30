import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-reservation-requests',
  templateUrl: './reservation-requests.page.html',
  styleUrls: ['./reservation-requests.page.scss'],
})
export class ReservationRequestsPage implements OnInit {
  Myreservations: any=[];

  constructor(public angularFireStore: AngularFirestore, public Activerouter: ActivatedRoute,
    private navCtrl:NavController,
    private restSr:RestApiService
    ) { }

  ngOnInit() {
    this.getMyreservations()
  }
  async getMyreservations(){
    this.restSr.showLoader()
    try {
      var user = JSON.parse(localStorage.getItem("userData")) ? JSON.parse(localStorage.getItem("userData")) : "";
      console.log(user)
      const reservationsDb = await this.angularFireStore.collection('reservation',res => {
        return res.limit(10)
        .orderBy('createdAt','desc')
      })
      const reserveData = await reservationsDb.valueChanges()
      reserveData.subscribe((response:any) =>{
        this.Myreservations = response;
        console.log(this.Myreservations)
        this.restSr.hideLoader()
      })
    } catch (error) {
      this.restSr.hideLoader()
      console.log(error)
    }
  }
  ApproveNow(reservation){
    this.angularFireStore.collection('reservation').doc(reservation.reservationId).update({
      'isApprovedByAdmin': "Approved"
  });
  this.angularFireStore.collection('hall').doc(reservation.hallId).update({
    'hallStatus': this.restSr.HallStatus[1].type
});
  }

}
