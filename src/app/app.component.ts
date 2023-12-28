import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private afAuth:AngularFireAuth,
    private navCtrl:NavController
  ) {
    const authObserver = afAuth.authState.subscribe(
      user => {
        if (user) {
          this.navCtrl.navigateRoot('/home');
        } else {
          this.navCtrl.navigateRoot('/login');
        }
      });
  }
}
