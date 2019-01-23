import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';


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



}
