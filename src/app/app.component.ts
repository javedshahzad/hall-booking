import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';
import { RestApiService } from './services/rest-api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user: any ={};
  constructor(
    private afAuth:AngularFireAuth,
    private navCtrl:NavController,
    public restSr:RestApiService
  ) {
    //this.restSr.IsLoggedInUser();
    var user = localStorage.getItem("userData") ? localStorage.getItem("userData") : "";
    console.log(user)
    if(user != ""){
      this.user = JSON.parse(user) ? JSON.parse(user) : "";
      console.log(this.user)
      if(this.user && this.user.type == 1){
        this.navCtrl.navigateRoot("/dashboard");
      }else if(this.user && this.user.type !== 1){
        this.navCtrl.navigateRoot("/home");
      }else{
        this.navCtrl.navigateRoot("/login");
      }
    }else{
      this.navCtrl.navigateRoot("/login");
    }
    let today = new Date()

console.log(today)
  
  }
}
