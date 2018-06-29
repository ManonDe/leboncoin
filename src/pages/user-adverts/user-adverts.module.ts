import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserAdvertsPage } from './user-adverts';

@NgModule({
  declarations: [
    UserAdvertsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserAdvertsPage),
  ],
})
export class UserAdvertsPageModule {}
