import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  mail: string;
  pass: string;

  public user: Array<any> = [];


  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
  ) {

  }

  checkData() {
    if (this.mail) {
      if (this.pass) {
        this.login();
      } else {
        this.presentToast("Password Not Provided")
      }
    } else {
      this.presentToast("Email Not Provided")
    }
  }


  login() {
    let loading = this.loadingCtrl.create({
      content: 'Logging In...'
    });
    loading.present();

    firebase.auth().signInWithEmailAndPassword(this.mail, this.pass).then(() => {
      loading.dismiss();
    }).catch((e) => {
      var err = e.message;
      this.presentToast(err);
      loading.dismiss();
    })

  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: "top",
      showCloseButton: false,
    });
    toast.present();
  }
}
