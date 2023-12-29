import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public logged: boolean = false;
  AllHallList: any = [];
  HallSearchArray: any;
  constructor(public angularFireStore: AngularFirestore, public router: Router) {
    this.getAllHalls();
  }
  getAllHalls(){
    this.angularFireStore.collection("hall").valueChanges().subscribe((response:any)=>{
      this.AllHallList = response;
      this.HallSearchArray = response;
      console.log(this.AllHallList)
    })
  }
  SearchHall(eve) {
    const str = eve.detail.value;
    console.log(str)
    if (str) {
        let arrdata = this.HallSearchArray;
        let x = arrdata.filter((a) => a.hallName.toUpperCase().includes(str.toUpperCase()));
        this.AllHallList = x;
    } else {
        this.AllHallList = this.HallSearchArray;
    }
}
viewHall(hall){
  console.log(hall)
}
  }