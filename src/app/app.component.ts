import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router } from '@angular/router';

import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private toastController: ToastController,
    private navController: NavController
  ) {
    this.initializeApp();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      var lastTimeBackPress = 0;
      var timePeriodToExit = 2000;
      this.platform.backButton.subscribeWithPriority(0, () => {
        let url = this.router.url;
        if(url.indexOf('login') != -1) {
          if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
            navigator['app'].exitApp();
          } else {
            this.presentToast("Press back again to exit App?");
            lastTimeBackPress = new Date().getTime();
          }
        } else {
          this.navController.pop();
        }
      });
    });
  }
}
