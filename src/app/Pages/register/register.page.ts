import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userData :any = {}
  constructor( public restSr:RestApiService, private navCtrl:NavController) { }

  ngOnInit() {
  }
  register(){
    if(this.userData.email && this.userData.password && this.userData.type){
      this.restSr.showLoader();
      this.restSr.AuthSignup(this.userData).then((respose:any)=>{
        console.log(respose)
        this.restSr.toast("Signup successfull!");
        this.restSr.hideLoader();
        this.navCtrl.navigateRoot("login")
      }).catch(error=>{
        this.restSr.toast(error.message)
      })
    }else{
      this.restSr.toast("Please fill all details!")
    }
 
  }
}
