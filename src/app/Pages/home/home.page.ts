import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RestApiService } from 'src/app/services/rest-api.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public logged: boolean = false;
  AllHallList: any = [];
  HallSearchArray: any;
  constructor(public angularFireStore: AngularFirestore, public router: Router,
    private navCtrl:NavController,
    private restSr:RestApiService
    ) {
    this.getAllHalls();
  }
  getAllHalls(){
    this.restSr.showLoader()
    this.angularFireStore.collection("hall").valueChanges().subscribe((response:any)=>{
      this.AllHallList = response;
      this.HallSearchArray = response;
      console.log(this.AllHallList)
      this.restSr.hideLoader()
    })
  }
  SearchHall(eve) {
    const str = eve.detail.value;
    console.log(str)
    if (str) {
        let arrdata = this.HallSearchArray;
        let x = arrdata.filter((a) => a.hallName.toUpperCase().includes(str.toUpperCase()) || a.hallCapacity.toString().includes(str.toString()));
        this.AllHallList = x;
    } else {
        this.AllHallList = this.HallSearchArray;
    }
}
viewHall(hall){
  console.log(hall)
  this.navCtrl.navigateForward("/view-hall",{queryParams:{hallDetails:hall}})
}
MyReservations(){
  this.navCtrl.navigateForward("/my-reservations")
}
chatWithadmin(){
  this.navCtrl.navigateForward("/chat")
}
  }