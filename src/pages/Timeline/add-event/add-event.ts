import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import moment from 'moment';
import { firebaseCred } from '../../../app/app.module';


@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {

  id = firebase.auth().currentUser.uid;


  clients: Array<any> = [];
  events: Array<any> = [];


  selClient: any;
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
    this.getClients();
    this.getEvents();
  }


  checkData() {
    if (this.selClient) {
      if (this.typeEvent) {
        if (this.status) {
          if (this.Response) {
            this.addEvent();
          } else { this.presentToast("What was the Response") }
        } else { this.presentToast("Enter a Status") }
      } else { this.presentToast("Select type of Event") }
    } else { this.presentToast("Select a Client") }
  }


  addEvent() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    firebase.database().ref("Timeline").push({
      Client: this.selClient.ClientName,
      ClientKey: this.selClient.key,
      Agent: this.id,
      EventType: this.typeEvent,
      Status: this.status,
      Response: this.Response,
      TimeStamp: moment().format(),
    }).then((res) => {
      firebase.database().ref("AgentsData").child(firebase.auth().currentUser.uid).child("Timeline").child(res.key).set(true).then(() => {
        firebase.database().ref("Client Timeline").child(this.selClient.key).child(res.key).set(true).then(() => {
          firebase.database().ref("Clients").child(this.selClient.key).child("Status").set(this.status).then(() => {
            this.selClient = null;
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
