import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private alertController: AlertController,
    private fireAuth: AngularFireAuth,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      //message: 'Please wait...',
      translucent: true,
    });
    return await loading.present();
  }

  async showAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async login() {
    if(this.user.email && this.user.password) {
      try {
        this.presentLoading();
        const response = await this.fireAuth.signInWithEmailAndPassword(this.user.email,this.user.password);
        this.loadingController.dismiss();
        if(response.user && response.user.email) {
          this.router.navigate(['/tabs/tab1']);
        }
      } catch (error) {
        this.loadingController.dismiss();
        if(error.message) {
          this.showAlert("Error", error.message);
        }
      }
    } else {
      this.showAlert('Warning', 'Incorrect email or password');
    }
  }

  register() {
    this.router.navigate(['/register']);
  }
}
