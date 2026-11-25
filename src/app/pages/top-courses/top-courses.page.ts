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
import { CatalogCourse, CourseTypeService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-top-courses',
  templateUrl: './top-courses.page.html',
  styleUrls: ['./top-courses.page.scss'],
})
export class TopCoursesPage implements OnInit {
  coursesList: CatalogCourse[] = [];
  selected: any = 'all';
  constructor(
    public util: UtilService,
    private courseService: CourseTypeService
  ) {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getFeaturedCatalogCourses().subscribe({
      next: (courses) => this.coursesList = courses,
      error: (error) => { console.error('Unable to load featured courses.', error); this.coursesList = []; },
    });
  }

  changeCourse() {
    this.loadCourses();
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
