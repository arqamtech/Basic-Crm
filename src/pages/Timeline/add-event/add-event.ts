import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { e } from '@angular/core/src/render3';
import { ThrowStmt } from '@angular/compiler';

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {

  id = firebase.auth().currentUser.uid;


  clients: Array<any> = [];


  selClient: string;
  typeEvent: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public db: AngularFireDatabase,
    public loadingCtrl: LoadingController,
  ) {
    this.getClients();
  }











  checkData() {
    if (this.selClient) {
      if (this.typeEvent) {
      } else { this.presentToast("Select type of Event") }
    } else { this.presentToast("Select a Client") }
  }

  // this.addEvent();

  addEvent(){
    
  }

  getClients() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.db.list(`AgentsData/${this.id}/Clients/`).snapshotChanges().subscribe(snap => {
      this.clients = [];
      snap.forEach(snip => {
        this.db.object(`Clients/${snip.key}`).snapshotChanges().subscribe(sniip => {
          if (sniip.payload.exists()) {

            let temp: any = sniip.payload.val();
            temp.key = sniip.key;
            this.clients.push(temp);
          }
        })
      })
    })
    loading.dismiss();
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
