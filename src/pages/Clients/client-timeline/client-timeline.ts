import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-client-timeline',
  templateUrl: 'client-timeline.html',
})
export class ClientTimelinePage {

  client = this.navParams.get("client");


  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams
  ) {
    console.log(this.client);
  }

  
}
