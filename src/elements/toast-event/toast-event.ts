import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';

import {ChatService} from '../../providers/chat-service/chat-service';
/**
 * Generated class for the ToastEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-toast-event',
  templateUrl: 'toast-event.html',
})
export class ToastEventPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private chatService:ChatService, private toastCtrl:ToastController) {
    this.chatService.listenOnAddAdvert();
    this.chatService.listenOnAddAdvert().subscribe(
      (data) => {
        this.presentToast("Liste d'annonce mise à jours ");
        console.log(data);
      },
      (error) => {
        this.presentToast(error);
        console.log(error);
      }
      
   )
    
  }
 //display a toat with message params
 presentToast(message: string) {
  let toast = this.toastCtrl.create({
    message: message,
    duration: 3000,
    position: 'top'
  });
  
  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

}
