/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import { SuccessPage } from '../success/success.page';

@Component({
  selector: 'app-finger-print',
  templateUrl: './finger-print.page.html',
  styleUrls: ['./finger-print.page.scss'],
})
export class FingerPrintPage implements OnInit {

  constructor(
    public util: UtilService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  onBack() {
    this.util.onBack();
  }

  async onHome() {
    const modal = await this.modalController.create({
      component: SuccessPage,
      backdropDismiss: false,
      cssClass: 'success-modal'
    });
    modal.onDidDismiss().then((data) => {
      this.util.navigateRoot('/tabs');
    });
    await modal.present();
  }

}
