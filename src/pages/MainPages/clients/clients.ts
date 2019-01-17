import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AddClientPage } from '../../Clients/add-client/add-client';

@IonicPage()
@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {

  id = firebase.auth().currentUser.uid;

  clientsRef = this.db.list(`Clients`);

  clients : Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public navParams: NavParams
  ) {
    this.getClients();
  }





  getClients() {
    this.db.list(`AgentsData/${firebase.auth().currentUser.uid}/Clients/`).snapshotChanges().subscribe(snap => {
      this.clients = [];
      snap.forEach(snip => {
        console.log(snip.key);
      })
    })
  }

  gtAddClient() { this.navCtrl.push(AddClientPage); }
}
