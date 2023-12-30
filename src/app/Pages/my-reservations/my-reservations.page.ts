import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.page.html',
  styleUrls: ['./my-reservations.page.scss'],
})
export class MyReservationsPage implements OnInit {
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
        .where('userId', '==', user.userId)
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
}
