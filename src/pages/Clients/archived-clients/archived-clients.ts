import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AddClientPage } from '../../Clients/add-client/add-client';
import { ClientDetailsPage } from '../../Clients/client-details/client-details';




@IonicPage()
@Component({
  selector: 'page-archived-clients',
  templateUrl: 'archived-clients.html',
})
export class ArchivedClientsPage {

  id = firebase.auth().currentUser.uid;

  clientsRef = this.db.list(`Clients`);

  clients: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {
    this.getClients();
  }





  getClients() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.db.list(`AgentsData/${this.id}/Archived Clients/`).snapshotChanges().subscribe(snap => {
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


  cDetails(c) { c.Archived = true; this.navCtrl.push(ClientDetailsPage, { client: c }); }
}
