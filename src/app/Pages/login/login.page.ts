import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userData :any = {}
  constructor( public restSr:RestApiService, private navCtrl:NavController) { }

  ngOnInit() {
  }
  login(){
    if(this.userData.email && this.userData.password){
      this.restSr.showLoader();
      this.restSr.AuthLogin(this.userData).then((respose:any)=>{
        console.log(respose)
        this.restSr.toast("Login successfull!");
        this.restSr.getuser()
        this.restSr.hideLoader();
        this.navCtrl.navigateRoot("home");
      }).catch(error=>{
        this.restSr.toast(error.message)
      })
    }else{
      this.restSr.toast("Please fill all details!")
    }
 
  }
}
