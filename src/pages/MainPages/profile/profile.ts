import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {


  loading = this.loadingCtrl.create({
    spinner: 'crescent',
    showBackdrop : true,	
  });


  constructor(
  public navCtrl: NavController, 
  public loadingCtrl : LoadingController,
  public alertCtrl : AlertController,
  public navParams: NavParams
  ) {
  }




  signOutConfirm(){
    let alert = this.alertCtrl.create({
      title: 'Confirm logout ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Logout',
          handler: () => {
            this.signOut();
          }
        }
      ]
    });
    alert.present();
  }
  
    signOut(){
      this.loading.present();
      firebase.auth().signOut().then(()=>{
        this.loading.dismiss();
      });
    }
  
}
