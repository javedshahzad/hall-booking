import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
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
  image_url: any;
  constructor( public restSr:RestApiService, private navCtrl:NavController,
    private activeRoute:ActivatedRoute,
    private firebaseStorage:AngularFireStorage,
     private angularFireStore:AngularFirestore,) { 
      this.activeRoute.queryParams.subscribe((response:any)=>{
        console.log(response)
        if(response.isEdit){
          this.IsEdit = response.isEdit;
          this.hallData = response.hallData;
           this.image_url=this.hallData.hallImage;
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
      this.hallData.hallImage = this.image_url;
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
      this.hallData.hallImage = this.image_url;
        this.angularFireStore.collection('hall').doc(this.hallData.hallId).update(this.hallData);
      this.restSr.hideLoader();
      this.restSr.toast("Hall has been updated successfully!");
      this.navCtrl.navigateBack("/dashboard")
   
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
