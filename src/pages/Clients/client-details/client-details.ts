import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-client-details',
  templateUrl: 'client-details.html',
})
export class ClientDetailsPage {

  client = this.navParams.get("client"); 


  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams
  ) {
    console.log(this.client);
  }


}
