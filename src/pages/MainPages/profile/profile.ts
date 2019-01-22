import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { ChangePassPage } from '../../Auth/change-pass/change-pass';
import { AngularFireDatabase } from 'angularfire2/database';
import { ArchivedClientsPage } from '../../Clients/archived-clients/archived-clients';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {


  loading = this.loadingCtrl.create({
    spinner: 'crescent',
    showBackdrop : true,	
  });

  id = firebase.auth().currentUser.uid;
  userName : string;
  userMail : string;
  constructor(
  public navCtrl: NavController, 
  public loadingCtrl : LoadingController,
  public db : AngularFireDatabase,
  public alertCtrl : AlertController,
  public navParams: NavParams
  ) {
    this.getUser();
  }

  getUser() {
    this.db.object(`Agents/${this.id}`).snapshotChanges().subscribe(snap => {
      let temp  :any = snap.payload.val();
      this.userName = temp.Name;
      this.userMail = temp.Email;
      
    })
  }




  signOutConfirm(){
    let alert = this.alertCtrl.create({
      title: 'Confirm logout ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Logout',
          handler: () => {
            this.signOut();
          }
        }
      ]
    });
    alert.present();
  }
  
    signOut(){
      this.loading.present();
      firebase.auth().signOut().then(()=>{
        this.loading.dismiss();
      });
    }
    gtchangePass(){this.navCtrl.push(ChangePassPage);}  
    gtArchivedClients(){this.navCtrl.push(ArchivedClientsPage);}  
}
