import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  };

  constructor(
    private router: Router,
    private alertController: AlertController,
    private fireAuth: AngularFireAuth,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
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

  async register() {
    if(this.user.email && this.user.password) {
      if(this.user.password != this.user.confirm_password) {
        this.presentToast("Password mismatch");
        return;
      }
      try {
        const response = await this.fireAuth.createUserWithEmailAndPassword(this.user.email,this.user.password);
        if(response.user && response.user.email) {
          this.showAlert("Success", "User successfully registered");
          this.router.navigate(['/login']);
        }
      } catch (error) {
          if(error.message) {
            this.showAlert("Error", error.message);
          }
      }
    } else {
      //this.showAlert("Warning", "Please fill the form with proper values");
      this.presentToast("Please fill the form with proper values");
    }
  }
}
