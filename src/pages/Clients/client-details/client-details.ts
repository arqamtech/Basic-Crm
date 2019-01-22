import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { ClientTimelinePage } from '../client-timeline/client-timeline';



@IonicPage()
@Component({
  selector: 'page-client-details',
  templateUrl: 'client-details.html',
})
export class ClientDetailsPage {

  client = this.navParams.get("client");

  liveClient: object;


  id = firebase.auth().currentUser.uid;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase,
    public navParams: NavParams
  ) {
    this.getClient();
    if (this.client.Archived) {
      console.log("Archived Client");
    }
  }

  getClient() {
    this.db.object(`Clients/${this.client.key}`).snapshotChanges().subscribe(snap => {
      if (snap.payload.exists()) {
        this.liveClient = snap.payload.val();
      }
    })
  }



  viewTimeline(){
    this.navCtrl.push(ClientTimelinePage,{client : this.client})
  }

  confirmArchive() {
    let alert = this.alertCtrl.create({
      title: 'Archive Client ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Archive',
          handler: () => {
            this.archiveClient();
          }
        }
      ]
    });
    alert.present();

  }
  confirmUnArchive() {
    let alert = this.alertCtrl.create({
      title: 'Un-Archive Client ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Un-Archive',
          handler: () => {
            this.unArchiveClient();
          }
        }
      ]
    });
    alert.present();

  }


  archiveClient() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    firebase.database().ref("AgentsData").child(this.id).child("Archived Clients").child(this.client.key).set(true).then(() => {
      firebase.database().ref("AgentsData").child(this.id).child("Clients").child(this.client.key).remove().then(() => {
        this.navCtrl.pop();
        this.presentToast("Client Archived");
        loading.dismiss();
      })
    })
  }

  unArchiveClient() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    firebase.database().ref("AgentsData").child(this.id).child("Clients").child(this.client.key).set(true).then(() => {
      firebase.database().ref("AgentsData").child(this.id).child("Archived Clients").child(this.client.key).remove().then(() => {
        this.navCtrl.pop();
        this.presentToast("Client Un-Archived");
        loading.dismiss();
      })
    })
  }






  delConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Delete Client',
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
            this.delClient();
          }
        }
      ]
    });
    alert.present();
  }


  delClient() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    firebase.database().ref("Clients").child(this.client.key).remove().then(() => {
      firebase.database().ref("AgentsData").child(this.id).child("Clients").child(this.client.key).remove().then(() => {
        this.navCtrl.pop();
        this.presentToast("Client Removed");
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

