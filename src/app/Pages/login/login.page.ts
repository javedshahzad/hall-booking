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
      this.restSr.AuthLogin(this.userData).then(async (respose:any)=>{
        console.log(respose)
       
        await this.restSr.getuser().then((user:any)=>{
          console.log(user)
          this.restSr.toast("Login successfull!");
          this.restSr.hideLoader();
          window.location.reload();
          if(user && user.type === 1){
            this.navCtrl.navigateRoot("/dashboard");
          }else if(user && user.type === 2){
            this.navCtrl.navigateRoot("/home");
          }else if(user && user.type === 3){
            this.navCtrl.navigateRoot("/upcoming-events");
          }
         
        })
        
        // 
      }).catch(error=>{
        this.restSr.toast(error.message)
      })
    }else{
      this.restSr.toast("Please fill all details!")
    }
 
  }
  registerNow(){
    this.navCtrl.navigateForward("/register")
  }
}
