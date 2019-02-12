import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-add-event-client-timeline',
  templateUrl: 'add-event-client-timeline.html',
})
export class AddEventClientTimelinePage {

  client = this.navParams.get('client');

  id = firebase.auth().currentUser.uid;


  events: Array<any> = [];


  typeEvent: string;
  status: string;
  Response: string;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public db: AngularFireDatabase,
    public loadingCtrl: LoadingController,
  ) {
    this.getEvents();
  }


  checkData() {
      if (this.typeEvent) {
        if (this.status) {
          if (this.Response) {
            this.addEvent();
          } else { this.presentToast("What was the Response") }
        } else { this.presentToast("Enter a Status") }
      } else { this.presentToast("Select type of Event") }
  }


  addEvent() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    firebase.database().ref("Timeline").push({
      Client: this.client.ClientName,
      ClientKey: this.client.key,
      Agent: this.id,
      EventType: this.typeEvent,
      Status: this.status,
      Response: this.Response,
      TimeStamp: moment().format(),
    }).then((res) => {
      firebase.database().ref("AgentsData").child(firebase.auth().currentUser.uid).child("Timeline").child(res.key).set(true).then(() => {
        firebase.database().ref("Client Timeline").child(this.client.key).child(res.key).set(true).then(() => {
          firebase.database().ref("Clients").child(this.client.key).child("Status").set(this.status).then(() => {
            this.typeEvent = null;
            this.status = null;
            this.Response = null;
          }).then(() => {
            this.navCtrl.pop();
            loading.dismiss();
            this.presentToast("Event Added");
          })
        })
      })
    })
  }

  getEvents() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.db.list(`Extra Data/Event Types`).snapshotChanges().subscribe(snap => {
      this.events = [];
      snap.forEach(snip => {
        if (snip.payload.exists()) {
          this.events.push(snip.payload.val());
        }
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
