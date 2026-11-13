/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-top-courses',
  templateUrl: './top-courses.page.html',
  styleUrls: ['./top-courses.page.scss'],
})
export class TopCoursesPage implements OnInit {
  coursesList: any[] = [];
  selected: any = 'all';
  constructor(
    public util: UtilService
  ) {
    this.changeCourse();
  }

  changeCourse() {
    const index = Math.floor(Math.random() * ((this.util.coursesList.length - 1) - 0 + 1) + 0);
    console.log('index=', index);
    console.log(this.util.coursesList.length);
    this.coursesList = this.util.coursesList[index].list;
    console.log(this.coursesList);
  }

  getDiscountedPrice(price: any, discount: any) {
    var numVal1 = Number(price);
    var numVal2 = Number(discount) / 100;
    var totalValue = numVal1 - (numVal1 * numVal2)
    return totalValue.toFixed(2);
  }

  ngOnInit() {
  }

  onBack() {
    this.util.onBack();
  }

  onSearch() {
    this.util.navigateToPage('search');
  }

  onCourseDetails(name: any, image: any, type: any) {
    const param: NavigationExtras = {
      queryParams: {
        name: name,
        image: image,
        type: type
      }
    };
    this.util.navigateToPage('course-details', param);
  }

}
