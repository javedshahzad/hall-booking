import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  text: string;
  public UserTypes= [
    {
      type:"Admin",
      typeId:1,
    },
    {
      type:"Client",
      typeId:2,
    },
    {
      type:"Guest",
      typeId:3,
    }
  ]
  constructor( private afAuth:AngularFireAuth,
     private angularFireStore:AngularFirestore,
     private loadingCtrl: LoadingController,
     private toastr: ToastController,
     private navCtrl:NavController
     ) { }
  public AuthLogin(data:any) {
    return new Promise((resolve, reject) =>{
      this.afAuth.signInWithEmailAndPassword(data.email, data.password).then((response:any)=>{
        resolve(response);
      }).catch(error=>{
        reject(error);
      });
    });
  }
  public AuthSignup(data:any) {
    return new Promise((resolve, reject) =>{
      this.afAuth.createUserWithEmailAndPassword(data.email, data.password).then(async (response:any)=>{
        await this.angularFireStore.collection('users').doc(response.user.uid).set(data);
        resolve(response);
      }).catch(error=>{
        reject(error);
      });
    });
  }
  public getuser() {
    try {
      return new Promise((resolve,reject) => {
        this.afAuth.user.subscribe(userid => {
          if(!userid) { 
            this.logOut();
            return reject(false) 
          }
          const userdoc: AngularFirestoreDocument<any> = this.angularFireStore.doc(`/users/${userid.uid}`);
           userdoc.valueChanges().subscribe((user:any) => {
            console.log(user)
            localStorage.setItem("userData",user);
            this.text = 'Hey, '+user['name'];
            return resolve(user);
           });
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  async toast(message) {
    const toast = await this.toastr.create({
        message: message,
        color: 'secondary',
        duration: 4000,
        animated:true,
        buttons: [
            {
              text: 'Ok!',
              role: 'cancel'
            }
          ],
    });
    toast.present();
    //end of toast
}
showLoader() {
    this.loadingCtrl.create({
        message: 'Pleas wait...',
        spinner: "lines-sharp",
        duration: 5000,
        mode: "ios",
        animated:true,
    }).then((res) => {
        res.present();
    });

}
hideLoader() {
    this.loadingCtrl.dismiss().then((res) => {
        console.log('Loading dismissed!', res);
    }).catch((error) => {
        console.log('error', error);
    });

}
  logOut(){
    localStorage.clear();
    this.afAuth.signOut();
    this.navCtrl.navigateRoot("login")
  }
}
