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
  /** array [0…9] for the capacity bar */
  public segments: number[] = Array.from({ length: 10 }, (_, i) => i);

  upcomingCourses: CourseByType[] = [];
  selectedType: number | null = null;

  // ----------------------------
  // Segment-related properties
  // ----------------------------
  public selectedTab: 'schedule' | 'modules' | 'tests' | 'certificate' = 'schedule';

  public modules = [
    { title: 'Module 1: Introduction' },
    { title: 'Module 2: Advanced Topics' },
    // … أضف المزيد حسب الحاجة
  ];

  public tests = [
    { name: 'اختبار منتصف الفصل' },
    { name: 'اختبار نهائي' },
    // … أضف المزيد حسب الحاجة
  ];

  // ----------------------------
  // End segment additions
  // ----------------------------

  constructor(
    public util: UtilService,
    private modalController: ModalController,
    private courseTypeService: CourseTypeService,
    private stateService: StateService
  ) {}

  ngOnInit() {
    this.stateService.courseSelectedType$.subscribe(id => {
      console.log('Received course type ID:', id);
      this.selectedType = id;
      if (id !== null) {
        this.loadUpcomingCourses();
      }
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

  // ----------------------------
  // Handle segment changes
  // ----------------------------
  onSegmentChanged(event: any) {
    console.log('التبويب الحالي:', this.selectedTab);
    // يمكنك هنا إضافة منطق تحميل البيانات حسب التبويب إذا دعت الحاجة
  }
  // ----------------------------
  // End segment handler
  // ----------------------------

  loadUpcomingCourses() {
    if (this.selectedType !== null) {
      this.courseTypeService.getCoursesByType(this.selectedType).subscribe(
        (data: CourseByType[]) => {
          this.upcomingCourses = data;
          console.log('Upcoming courses:', this.upcomingCourses);
        },
        error => {
          console.error('Error fetching upcoming courses', error);
        }
      );
    }
  }

  getUsedSegments(registeredCount: number, capacity: number): number {
    if (!capacity) {
      return 0;
    }
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
}
