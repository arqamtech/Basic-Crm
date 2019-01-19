import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/Supp/tabs/tabs';
import * as firebase from 'firebase';
import { LoaderPage } from '../pages/Supp/loader/loader';
import { LoginPage } from '../pages/Auth/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoaderPage;

    constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen
    ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      
      firebase.auth().onAuthStateChanged((user)=>{
        if(user){
          this.rootPage = TabsPage;
        }else{
          this.rootPage = LoginPage;
        }
      })

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  
  }

}
