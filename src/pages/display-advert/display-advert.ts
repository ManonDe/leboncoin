import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//Pages
import { HomePage } from '../home/home';

//Models
import { Advert } from '../../Models/advert';

@IonicPage()
@Component({
  selector: 'page-display-advert',
  templateUrl: 'display-advert.html',
})
export class DisplayAdvertPage {
  advert:Advert;
  pictureURI:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    //Check if get Advert object
    if(navParams.get('ad')){
      this.advert = navParams.get('ad');
      this.pictureURI = this.advert.img;
    }else{
      this.navCtrl.push(HomePage);
    }
    
  }
}
