/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { CourseTypeService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-online-courses',
  templateUrl: './online-courses.page.html',
  styleUrls: ['./online-courses.page.scss'],
})
export class OnlineCoursesPage implements OnInit {
  name: any = '';
  selected: any = 'courses';
  coursesList: any[] = [];
  constructor(
    public util: UtilService,
    private route: ActivatedRoute,
    private courseService: CourseTypeService
  ) {
    this.route.queryParams.subscribe((data: any) => {
      console.log(data);
      this.name = data.name;
      this.loadCourses();
    });
  }

  loadCourses() {
    this.courseService.getCourseTypes().subscribe({
      next: (types) => {
        const type = types.find((item) => item.name === this.name);
        if (!type) {
          this.coursesList = [];
          return;
        }
        this.courseService.getCatalogCourses(type.id).subscribe({
          next: (courses) => this.coursesList = courses,
          error: (error) => { console.error('Unable to load courses.', error); this.coursesList = []; },
        });
      },
      error: (error) => { console.error('Unable to load course categories.', error); this.coursesList = []; },
    });
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

  changeSelected(name: any) {
    this.selected = name;
  }

  onFilter() {
    this.util.navigateToPage('filter');
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

  onMentorDetails(name: any, image: any) {
    const param: NavigationExtras = {
      queryParams: {
        name: name,
        image: image
      }
    };
    this.util.navigateToPage('mentor-details', param);
  }

}
