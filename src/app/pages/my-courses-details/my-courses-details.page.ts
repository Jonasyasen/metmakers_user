import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import { VideoPlayerPage } from '../video-player/video-player.page';
import { CourseTypeService, CourseByType } from 'src/app/services/courses.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-my-courses-details',
  templateUrl: './my-courses-details.page.html',
  styleUrls: ['./my-courses-details.page.scss'],
})
export class MyCoursesDetailsPage implements OnInit {
  public segments: number[] = Array.from({ length: 10 }, (_, i) => i);
  upcomingCourses: CourseByType[] = [];
  selectedType: number | null = null;

  public selectedTab: 'schedule' | 'modules' | 'tests' | 'certificate' = 'schedule';
  public selectedTypeName: string | null = null;

  public modules = [
    { title: 'Module 1: Introduction' },
    { title: 'Module 2: Advanced Topics' },
  ];

  public tests = [
    { name: 'اختبار منتصف الفصل' },
    { name: 'اختبار نهائي' },
  ];

  constructor(
    public util: UtilService,
    private modalController: ModalController,
    private courseTypeService: CourseTypeService,
    private stateService: StateService
  ) {}
  shouldDisableCourse(course: CourseByType): boolean {
    const hasEnrollment = this.hasAnyActiveEnrollment();
    return hasEnrollment && !course.is_registered;
  }
  ngOnInit() {
    this.stateService.courseSelectedType$.subscribe(id => {
     // console.log('Received course type ID:', id);
      this.selectedType = id;
      if (id !== null) {
        this.loadUpcomingCourses();
      }
    });
  
    this.stateService.courseTypeName$.subscribe((name: any) => {
   //   console.log('Received course type name:', name);
      this.selectedTypeName = name;

      // this.selectedTypeName = name;
    });
  }
  
  
  ionViewWillEnter() {
    const type = this.stateService.getSelectedCourseType();
    if (type !== null) {
      this.selectedType = type;
      this.loadUpcomingCourses();
    }
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

  onSegmentChanged(event: any) {
   // console.log('التبويب الحالي:', this.selectedTab);
  }

  loadUpcomingCourses() {
    if (this.selectedType !== null) {
      this.courseTypeService.getCoursesByType(this.selectedType).subscribe(
        (data: CourseByType[]) => {
          this.upcomingCourses = data;
        //  console.log('Upcoming courses:', this.upcomingCourses);
        },
        error => {
          console.error('Error fetching upcoming courses', error);
        }
      );
    }
  }

  getUsedSegments(registeredCount: number, capacity: number): number {
    if (!capacity) return 0;
    const ratio = registeredCount / capacity;
    return Math.min(10, Math.round(ratio * 10));
  }

  hasAnyActiveEnrollment(): boolean {
    return this.upcomingCourses.some(c => c.is_registered === true);
  }

  enrollCourse(courseId: number, studentId: number) {
    this.courseTypeService.enrollCourse(courseId, studentId).subscribe(
      () => {
        this.util.showToast('Enrollment successful', 'success', 'bottom');
        this.loadUpcomingCourses();
      },
      error => {
        console.error('Error enrolling in course', error);
        this.util.showToast('Error enrolling in course', 'danger', 'bottom');
      }
    );
  }

  cancelCourse(courseId: number) {
    this.courseTypeService.cancelCourse(courseId).subscribe(
      () => {
        this.util.showToast('Cancellation successful', 'success', 'bottom');
        this.loadUpcomingCourses();
      },
      error => {
        console.error('Error cancelling course', error);
        this.util.showToast('Error cancelling course', 'danger', 'bottom');
      }
    );
  }

  /** ✅ دالة تنسيق التاريخ */
  formatCourseDate(start: string, end: string): string {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const day = startDate.getDate().toString().padStart(2, '0');
    const month = startDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const startTime = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const endTime = endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return `${day} ${month}\u2002|\u2002${startTime}–${endTime}`;
  }
}
