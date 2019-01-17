import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import moment from 'moment';
import * as firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-add-client',
  templateUrl: 'add-client.html',
})
export class AddClientPage {

  cName: string;
  cPhone: number;
  cPhone2: number;
  contactName: string;




  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {
  }






  checkData() {
    if (this.cName) {
      if (this.cPhone) {
      if (this.contactName) {
        this.addClient();
      } else { this.presentToast("Enter a contact Person's Name") }
      } else { this.presentToast("Enter Client's Phone Number") }
    } else { this.presentToast("Enter Client's Name") }
  }




  addClient() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();

    this.db.list(`Clients`).push({
      ClientName: this.cName,
      ContactPerson : this.contactName,
      PhoneNumber: this.cPhone,
      PhoneNumber2: this.cPhone2,
      TimeStamp: moment().format(),
    }).then((res)=>{
      this.db.object(`AgentsData/${firebase.auth().currentUser.uid}/Clients/${res.key}`).set(true).then(()=>{
        loading.dismiss();
      })
    })
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
