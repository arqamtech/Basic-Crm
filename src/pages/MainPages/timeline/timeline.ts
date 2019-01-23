import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { EventDetailsPage } from '../../Timeline/event-details/event-details';
import { AddEventPage } from '../../Timeline/add-event/add-event';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class TimelinePage {

  id = firebase.auth().currentUser.uid;

  events: Array<any> = [];


  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {
    this.getEvents();
  }
  getEvents() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.db.list(`AgentsData/${this.id}/Timeline/`).snapshotChanges().subscribe(snap => {
      this.events = [];
      snap.forEach(snip => {
        this.db.object(`Timeline/${snip.key}`).snapshotChanges().subscribe(snapi => {
          if (snapi.payload.exists()) {
            let temp: any = snapi.payload.val();
            temp.key = snapi.key;
            this.events.push(temp);
            this.events.reverse();
          }
        })
      })
      this.events.sort((a, b) => new Date(b.TimeStamp).getTime() - new Date(a.TimeStamp).getTime());
    })
    loading.dismiss();
  }

  eDetails(e) { this.navCtrl.push(EventDetailsPage, { event: e }); }
  gtAddEvent() { this.navCtrl.push(AddEventPage); }

}
