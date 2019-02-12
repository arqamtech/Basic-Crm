import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html',
})
export class EventDetailsPage {

  event = this.navParams.get("event");
  agent : string;

  constructor(
    public navCtrl: NavController,
    public alertCtrl : AlertController,
    public toastCtrl : ToastController,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase,
    public navParams: NavParams) {
    this.getAgent();
  }

  getAgent() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.db.object(`Agents/${this.event.Agent}`).snapshotChanges().subscribe(snap => {
      let temp  :any = snap.payload.val();
        this.agent = temp.Name;    
    })
    loading.dismiss();
  }


  
  delConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Delete Event',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.delEvent();
          }
        }
      ]
    });
    alert.present();
  }


  delEvent() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    console.log(this.event);
    
    firebase.database().ref("Timeline").child(this.event.key).remove().then(() => {
      firebase.database().ref("Client Timeline").child(this.event.ClientKey).child(this.event.key).remove().then(() => {
        this.navCtrl.pop();
        this.presentToast("Event Removed");
        loading.dismiss();
      })
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
