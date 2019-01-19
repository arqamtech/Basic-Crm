import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  clients : Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public navParams: NavParams
  ) {
    this.getClients();
  }





  getClients() {
    this.db.list(`AgentsData/${this.id}/Clients/`).snapshotChanges().subscribe(snap => {
      this.clients = [];
      snap.forEach(snip => {
        this.db.object(`Clients/${snip.key}`).snapshotChanges().subscribe(sniip=>{
          let temp : any = sniip.payload.val();
          temp.key = sniip.key;
          this.clients.push(temp);
        })
      })
    })
  }


  cDetails(c) { this.navCtrl.push(ClientDetailsPage,{client : c}); }
  gtAddClient() { this.navCtrl.push(AddClientPage); }
}
