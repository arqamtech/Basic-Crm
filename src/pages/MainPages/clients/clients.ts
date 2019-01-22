import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AddClientPage } from '../../Clients/add-client/add-client';
import { ClientDetailsPage } from '../../Clients/client-details/client-details';

@IonicPage()
@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {

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
    this.db.list(`AgentsData/${this.id}/Clients/`).snapshotChanges().subscribe(snap => {
      snap.forEach(snip => {
        this.clients = [];
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


  cDetails(c) { this.navCtrl.push(ClientDetailsPage, { client: c }); }
  gtAddClient() { this.navCtrl.push(AddClientPage); }
}
