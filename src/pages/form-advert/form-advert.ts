import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

//Modules
import { NativeStorage } from '@ionic-native/native-storage';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { Camera } from '@ionic-native/camera';

//Pages
import { LoginPage } from '../login/login';

//Models
import { Advert } from '../../Models/advert';

//Providers
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-form-advert',
  templateUrl: 'form-advert.html',
})
export class FormAdvertPage {
  advertForm: FormGroup;
  pictureURI: string;
  imgView: string;
  token: string;
  idUser: string;
  errorMessage: string;
  isUpdate: boolean = false;
  buttonForm: string = "Créer";
  currentIdAdvert: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage, platform: Platform, private photoLibrary: PhotoLibrary,
    private camera: Camera, private alertCtrl: AlertController, private toastCtrl: ToastController, private apiService: ApiServiceProvider, private loadingCtrl: LoadingController) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.nativeStorage.getItem('user').then(
        (data) => {
          let user = JSON.parse(data);
          this.token = user['token'];
          this.idUser = user['id_user'];
        },
        (error) => this.navCtrl.push(LoginPage)
      );
    });

    this.advertForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl(null, Validators.required),
      localisation: new FormControl(null, Validators.required),
    });
    //Check if get Advert object
    if (navParams.get('ad')) {
      this.isUpdate = true;
      this.buttonForm = "Modifier";
      let advert = navParams.get('ad');
      this.currentIdAdvert = advert._id;
      this.pictureURI = advert.img;

      this.advertForm.setValue({
        title: advert.title,
        description: advert.description,
        price: advert.price,
        localisation: advert.localisation
      })
    }

  }

  //User choice behind Camera or Gallery
  addPicture() {
    let alert = this.alertCtrl.create({
      title: 'Choix ce l\'image',
      buttons: [
        {
          text: 'Choisir une Photo',
          handler: () => {
            this.openGallery();
          }
        },
        {
          text: 'Prendre une photo',
          handler: () => {
            this.takePic();
          }
        }
      ]
    });
    alert.present();
  }

  //open Camera and get picture
  takePic() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      allowEdit: true,
      targetWidth: 350,
      targetHeight: 350,
    }).then((imageData) => {

      console.log(imageData);
      this.pictureURI = 'data:image/jpeg;base64,' + imageData;
      this.presentToast(this.pictureURI);


    },
      (err) => {
        console.log(err);
      });
  }

  //open gallery and get picture

  openGallery() {

      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        allowEdit: true,
        quality: 100,
        targetWidth: 350,
        targetHeight: 350,
        sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
      }).then((imageData) => {
        this.pictureURI = imageData;
        this.pictureURI = 'data:image/jpeg;base64,' + imageData;
  
  
      },
        (err) => {
          console.log(err);
        });
    }

  //delete picture of form
  deletePicture() {
    this.pictureURI = null;
  }

  //display tost with params message
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

  //Send Advert (post or Put)
  postAdvert() {
    let loading = this.loadingCtrl.create({
      content: 'Patientez...'
    })
    loading.present();

    if (this.advertForm.valid) {
      let advert = new Advert(this.advertForm.value.title, this.pictureURI, this.advertForm.value.price,
        this.advertForm.value.description, this.advertForm.value.localisation, this.idUser);

      if (this.isUpdate) {
        advert._id = this.currentIdAdvert;

        this.apiService.PutAdvert(advert, this.token).subscribe(
          data => {
            loading.dismiss();
            let alert = this.alertCtrl.create({
              title: 'Annonce Modifiée',
              buttons: [
                {
                  text: 'Ok',
                  handler: () => {
                    this.navCtrl.push(HomePage);
                  }
                },
              ],
            });
            alert.present();
          },
          error => {
            loading.dismiss();
            console.error(error);
          }
        );
      } else {
        this.apiService.postAdvert(advert, this.token).subscribe(
          data => {
            loading.dismiss();

            let alert = this.alertCtrl.create({
              title: 'annonce crée',
              buttons: [
                {
                  text: 'Ok',
                  handler: () => {
                    this.navCtrl.push(HomePage);
                  }
                },
              ],
            });

            alert.present();
          },
          error => {
            loading.dismiss();
            this.presentToast(error);
          }
        );
      }
    } else {
      this.presentToast("Verifier le formulaire");
    }
  }
}
