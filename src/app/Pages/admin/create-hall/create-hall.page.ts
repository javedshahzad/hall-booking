import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-create-hall',
  templateUrl: './create-hall.page.html',
  styleUrls: ['./create-hall.page.scss'],
})
export class CreateHallPage implements OnInit {
 hallData:any={};
  IsEdit: boolean=false;
  constructor( public restSr:RestApiService, private navCtrl:NavController,
    private activeRoute:ActivatedRoute,
     private angularFireStore:AngularFirestore,) { 
      this.activeRoute.queryParams.subscribe((response:any)=>{
        console.log(response)
        if(response.isEdit){
          this.IsEdit = response.isEdit;
          this.hallData = response.hallData;
        }
       
      })
     }

  ngOnInit() {
  }
  CreateHall(){
    this.restSr.showLoader();
    if(this.hallData.hallName && this.hallData.hallNumber){
      let today = new Date();
      this.hallData.createdAt = today;
      this.angularFireStore.collection("hall").add(this.hallData).then((respone:any)=>{
        this.angularFireStore.collection('hall').doc(respone.id).update({
          'hallId': respone.id
      });
      this.restSr.hideLoader();
      this.restSr.toast("Hall has been added successfully!");
      this.navCtrl.navigateBack("dashboard")
      })
    }
  
  }
  UpdateHall(){
   
    if(this.hallData.hallName && this.hallData.hallNumber){
      this.restSr.showLoader();
        this.angularFireStore.collection('hall').doc(this.hallData.hallId).update(this.hallData);
      this.restSr.hideLoader();
      this.restSr.toast("Hall has been updated successfully!");
      this.navCtrl.navigateBack("/dashboard")
   
    }
  
  }
}
