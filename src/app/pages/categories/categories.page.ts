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
import { CourseType, CourseTypeService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  courseTypes: CourseType[] = [];

  constructor(
    public util: UtilService,
    private courseService: CourseTypeService
  ) { }

  ngOnInit() {
    this.courseService.getCourseTypes().subscribe({
      next: (types) => this.courseTypes = types,
      error: (error) => console.error('Unable to load course categories.', error),
    });
  }

  onBack() {
    this.util.onBack();
  }

  onCourseList(name: any) {
    const param: NavigationExtras = {
      queryParams: {
        name: name
      }
    };
    this.util.navigateToPage('online-courses', param);
  }

}
