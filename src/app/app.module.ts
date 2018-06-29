import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule,LoadingController, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { HttpClientModule } from '@angular/common/http';
import { Base64 } from '@ionic-native/base64';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import {DisplayAdvertPage } from '../pages/display-advert/display-advert';
import { FormAdvertPage } from '../pages/form-advert/form-advert';
import { UserAdvertsPage } from '../pages/user-adverts/user-adverts';
import { ToastEventPage } from '../elements/toast-event/toast-event';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import {UtilsList} from '../Utils/lists-utils';
import {ConfigUrlApi} from '../Utils/ConfigUrlApi';
import { ChatService } from '../providers/chat-service/chat-service';

const config: SocketIoConfig = { url: 'wss://echo.websocket.org/', options: {} };


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    DisplayAdvertPage,
    FormAdvertPage,
    RegisterPage,
    UserAdvertsPage,
    ToastEventPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    SocketIoModule.forRoot(config) 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    DisplayAdvertPage,
    FormAdvertPage,
    RegisterPage,
    UserAdvertsPage,
    ToastEventPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    ApiServiceProvider,
    UtilsList,
    NativeStorage,
    HttpClientModule,
    ConfigUrlApi,
    Base64,
    Camera,
    PhotoLibrary,
    Base64ToGallery,
    LoadingController,
    AlertController,
    ChatService
  ]
})
export class AppModule {}
