import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { LoaderPage } from '../../Supp/loader/loader';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  id = firebase.auth().currentUser.uid;

  totClients  :number =0;

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  public db : AngularFireDatabase,
  ) {
    this.getClients();
  }

  getClients(){
    this.db.list(`AgentsData/${this.id}/Clients`).snapshotChanges().subscribe(snap=>{
      this.totClients =  snap.length;
    })
  }

}
