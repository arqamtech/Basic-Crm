import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Tabs } from 'ionic-angular';
import * as firebase from 'firebase';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
@IonicPage()
@Component({
  selector: 'page-loader',
  templateUrl: 'loader.html',
})
export class LoaderPage {

  authState : boolean = false;
  dbStat : boolean = false;


  loading = this.loadingCtrl.create({
    spinner: 'crescent',
    showBackdrop : false,	
  });

  constructor(
  public navCtrl: NavController, 
  public loadingCtrl : LoadingController,
  public navParams: NavParams
  ) {
    this.checkUser();
  }
  ionViewDidEnter(){
    this.checkUser();
    this.loading.present();
  }


  checkUser(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.navCtrl.setRoot(TabsPage)
      }else{
        this.navCtrl.setRoot(LoginPage)
      }
    })

  }

  ionViewDidLeave(){
    this.loading.dismissAll();
  }


}
