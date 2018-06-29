import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ToastEventPage } from './toast-event';

@NgModule({
  declarations: [
    ToastEventPage,
  ],
  imports: [
    IonicPageModule.forChild(ToastEventPage),
  ],
})
export class ToastEventPageModule {}
