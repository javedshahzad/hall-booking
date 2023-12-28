import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public logged: boolean = false;
  constructor(public FBAuth: AngularFireAuth, public router: Router) {
  }
  
  
  logout() {
     this.FBAuth.signOut();
  }
  

  
  }