/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 
  Source code is licensed as per 
  the terms found in the Website https://initappz.com/license
  Copyright ...
*/
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import { VideoPlayerPage } from '../video-player/video-player.page';
import { CourseTypeService } from 'src/app/services/courses.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-my-courses-details',
  templateUrl: './my-courses-details.page.html',
  styleUrls: ['./my-courses-details.page.scss'],
})
export class MyCoursesDetailsPage implements OnInit {

  // بيانات تجريبية للعرض
  upcomingCourses = [
    {
      instructorName: 'John Doe',
      date: '24/FEB',
      location: 'Room 1',
      capacity: 10,
      registered: 10
    },
    {
      instructorName: 'Jane Smith',
      date: '25/FEB',
      location: 'Room 2',
      capacity: 10,
      registered: 7
    },
    {
      instructorName: 'Alice Brown',
      date: '26/FEB',
      location: 'Room 3',
      capacity: 10,
      registered: 3
    }
  ];

  constructor(
    public util: UtilService,
    private modalController: ModalController,
    private courseTypeService: CourseTypeService,
    private stateService: StateService
  ) {}

  ngOnInit() {
    // إذا كنت ترغب في جلب بيانات حقيقية من خدمة ما، يمكنك استخدام
    // this.loadUpcomingCourses() أو ما شابه
  }

  // دالة تحسب عدد الأجزاء الخضراء من أصل 10
  getUsedSegments(registered: number, capacity: number): number {
    if (!capacity) {
      return 0;
    }
    return Math.round((registered / capacity) * 10);
  }

  onBack() {
    this.util.onBack();
  }

  viewCertificate() {
    this.util.navigateToPage('/view-certificate');
  }

  async openVideoPlayer() {
    const modal = await this.modalController.create({
      component: VideoPlayerPage,
    });
    await modal.present();
  }
}
