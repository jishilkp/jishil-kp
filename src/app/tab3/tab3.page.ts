import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  data: any = [];

  constructor(
    private http: HttpClient,
    private loadingController: LoadingController
  ) {}

  async presentLoading() {
    const loading = await this.loadingController.create({
      //message: 'Please wait...',
      translucent: true,
    });
    return await loading.present();
  }

  loadDataFromCloud(event) {
    this.presentLoading();
    this.http.get('https://jsonplaceholder.typicode.com/comments')
    .subscribe(data => {
      this.data = data;
      this.loadingController.dismiss();
      if (event) {
          event.target.complete();
          this.loadingController.dismiss();
      }
    }, error => {
      this.loadingController.dismiss();
      if (event) {
        event.target.complete();
      }
    });
  }

  ionViewWillEnter() {
    this.loadDataFromCloud(null);
  }

}
