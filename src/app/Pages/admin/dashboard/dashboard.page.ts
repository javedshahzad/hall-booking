import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NavController } from '@ionic/angular';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  AllHallList: any=[];

  constructor( public restSr:RestApiService, private navCtrl:NavController, private angularFireStore:AngularFirestore,) { }

  ngOnInit() {
    this.getAllHalls()
  }
  AddnewHall(){
    this.navCtrl.navigateForward("/create-hall")
  }
  getAllHalls(){
    this.restSr.showLoader()
    this.angularFireStore.collection("hall").valueChanges().subscribe((response:any)=>{
      this.AllHallList = response;
      console.log(this.AllHallList)
      this.restSr.hideLoader()
    })
  }
  DeleteHall(hall){
    this.angularFireStore.collection("hall").doc(hall.hallId).delete();
    this.restSr.toast("Hall has been deleted Successfully");
  }
  EditHall(hall){
    console.log(hall)
    this.navCtrl.navigateForward("/create-hall",{queryParams:{isEdit:true,hallData:hall}})
  }
  MyReservations(){
    this.navCtrl.navigateForward("/reservation-requests")
  }
  chatWithClents(){
    this.navCtrl.navigateForward("/clients")
  }
}
