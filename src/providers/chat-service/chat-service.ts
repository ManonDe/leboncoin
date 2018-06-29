import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';

import * as io from 'socket.io-client';


@Injectable()
export class ChatService {
  private url = 'https://leboncoin-malik10.c9users.io';
  private socket = io(this.url);


  onAddContact(contact) {
    this.socket.emit('message', "ffff");
  }
  listenOnAddAdvert() {
    let observable = new Observable(observer => {
      this.socket.on('advert', (data) => {
        observer.next(data);
        console.log(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
  return observable;
  }
}