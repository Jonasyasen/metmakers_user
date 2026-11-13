/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCoursesDetailsPageRoutingModule } from './my-courses-details-routing.module';

import { MyCoursesDetailsPage } from './my-courses-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyCoursesDetailsPageRoutingModule
  ],
  declarations: [MyCoursesDetailsPage]
})
export class MyCoursesDetailsPageModule { }
