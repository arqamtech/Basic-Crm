import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { EventDetailsPage } from '../../Timeline/event-details/event-details';


@IonicPage()
@Component({
  selector: 'page-client-timeline',
  templateUrl: 'client-timeline.html',
})
export class ClientTimelinePage {

  client = this.navParams.get("client");

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
    this.db.list(`Client Timeline/${this.client.key}`).snapshotChanges().subscribe(snap => {
      this.events = [];
      snap.forEach(snip => {
        this.db.object(`Timeline/${snip.key}`).snapshotChanges().subscribe(snapi => {
          if (snapi.payload.exists()) {
            let temp: any = snapi.payload.val();
            temp.key = snapi.key;

            this.db.object(`Agents/${temp.Agent}/Name`).snapshotChanges().subscribe(snap => {
              temp.AgentName = snap.payload.val();
            })

            this.events.push(temp);
            this.events.reverse();
          }
        })
      })
      this.events.sort((a, b) => new Date(b.TimeStamp).getTime() - new Date(a.TimeStamp).getTime());
    })
    loading.dismiss();

  }

  // this.db.object(`Agents/${this.event.Agent}`).snapshotChanges().subscribe(snap => {
  //   let temp  :any = snap.payload.val();
  //     this.agent = temp.Name;    
  // })



  eDetails(e) { this.navCtrl.push(EventDetailsPage, { event: e }); }

}
