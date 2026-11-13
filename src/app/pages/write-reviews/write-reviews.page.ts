/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-write-reviews',
  templateUrl: './write-reviews.page.html',
  styleUrls: ['./write-reviews.page.scss'],
})
export class WriteReviewsPage implements OnInit {

  constructor(
    public util: UtilService,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
  }

  onBack() {
    this.util.onBack();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose From',
      buttons: [{
        text: 'Camera',
        role: 'destructive',
        icon: 'camera-outline',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Gallery',
        icon: 'image-outline',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });

    await actionSheet.present();
  }

}
