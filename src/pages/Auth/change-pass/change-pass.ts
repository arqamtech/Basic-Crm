import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { Slides } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-change-pass',
  templateUrl: 'change-pass.html',
})
export class ChangePassPage {
  @ViewChild(Slides) slides: Slides;

  cpass: string;
  dbPass: string;


  npass: string;
  npass2: string;

  id = firebase.auth().currentUser.uid;

  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {
    this.getUser();
  }

  getUser() {
    this.db.object(`Agents/${this.id}`).snapshotChanges().subscribe(snap => {
      let temp: any = snap.payload.val();
      this.dbPass = temp.Password;
    })
  }

  verifyPass() {
    if (this.cpass) {
      if (this.cpass == this.dbPass) {
        this.gtSecond();
      } else { this.presentToast("Incorrect Password") }
    } else { this.presentToast("Enter current password"); }
  }



  checkPass() {
    if (this.npass) {
      if (this.npass2) {
        if (this.npass == this.npass2) {
          this.changePass();
        } else { this.presentToast("Passwords do not match"); }
      } else { this.presentToast("Re-enter the password"); }
    } else { this.presentToast("Enter a new Password"); }
  }

  changePass() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();

    firebase.auth().currentUser.updatePassword(this.npass).catch((e)=>{
      console.log(e.message);
    }).then(() => {
      this.db.object(`Agents/${this.id}/Password`).set(this.npass).then(() => {
        this.presentToast("Password Changed");
      }).then(() => {
        this.navCtrl.pop();
        loading.dismiss();
      })
    })
  }


  gtSecond() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1, 500);
    this.slides.lockSwipes(true);
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
