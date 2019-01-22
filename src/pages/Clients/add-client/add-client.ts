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
  cPhone: string;
  cPhone2: string = null;
  contactName: string;
  cType: string;

  webC: boolean = false;
  webQ: number = 0

  smC: boolean = false;
  smQ: number = 0

  inHouseC: boolean = false;
  inHouseQ: number = 0;

  desc: string;

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
      if (this.cType) {
        if (this.cPhone) {
          if (this.cPhone.length == 10) {
            if (this.contactName) {
              if (this.desc) {
                this.addClient();
              } else { this.presentToast("Enter Client's Description") }
            } else { this.presentToast("Enter a contact Person's Name") }
          } else { this.presentToast("Contact Number not Valid") }
        } else { this.presentToast("Enter Client's Phone Number") }
      } else { this.presentToast("Select a Client Type") }
    } else { this.presentToast("Enter Client's Name") }
  }



  addClient() {

    let tot = this.webQ + this.smQ + this.inHouseQ;

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.db.list(`Clients`).push({
      ClientName: this.cName,
      Type: this.cType,
      ContactPerson: this.contactName,
      PhoneNumber: this.cPhone,
      PhoneNumber2: this.cPhone2,
      Website: this.webC,
      WebsiteQuote: this.webQ,
      SocialMedia: this.smC,
      SocialMediaQuote: this.smQ,
      InHouseOrder: this.inHouseC,
      Status  : "Just Added",
      InHouseOrderQuote: this.inHouseQ,
      Description: this.desc,
      Total : tot,
      TimeStamp: moment().format(),
    }).then((res) => {
      this.db.object(`AgentsData/${firebase.auth().currentUser.uid}/Clients/${res.key}`).set(true).then(() => {
        loading.dismiss();
      }).then(() => {
        this.cName = null;
        this.cType = null;
        this.contactName = null;
        this.cPhone = null;
        this.cPhone2 = null;
        this.webC = false;
        this.webQ = 0;
        this.smC = false;
        this.smQ = 0;
        this.inHouseC = false;
        this.inHouseQ = 0;
        this.desc = null;
      }).then(() => {
        this.navCtrl.pop();
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
