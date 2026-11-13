/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.page.html',
  styleUrls: ['./course-details.page.scss'],
})
export class CourseDetailsPage implements OnInit {
  name: any = '';
  image: any = '';
  type: any = '';

  selectedSegments: any = 'about';
  constructor(
    public util: UtilService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((data: any) => {
      console.log(data);
      this.name = data.name;
      this.image = data.image;
      this.type = data.type;
    });
  }

  ngOnInit() {
  }

  onBack() {
    this.util.onBack();
  }

  changeSegments(name: any) {
    this.selectedSegments = name;
  }

  onMentorDetails() {
    const param: NavigationExtras = {
      queryParams: {
        name: 'John Cannery',
        image: 'assets/images/avatar/2.jpg'
      }
    };
    this.util.navigateToPage('mentor-details', param);
  }

  onPage(name: any) {
    this.util.navigateToPage(name);
  }

}
