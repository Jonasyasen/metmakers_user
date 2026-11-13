import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { CourseTypeService, CourseType } from 'src/app/services/courses.service';
import { StateService } from 'src/app/services/state.service';
import { Icon } from 'ionicons/dist/types/components/icon/icon';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.page.html',
  styleUrls: ['./my-courses.page.scss'],
})
export class MyCoursesPage implements OnInit {
  selected: string = 'completed';
  courstypeesList: CourseType[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(
    public util: UtilService,
    private courseTypeService: CourseTypeService,
    public stateService: StateService // ← هنا التغيير
  ) {}

  ngOnInit() {
    this.loadCourseTypes();
    // مراقبة التغيرات في النوع المحدد لغايات التحقق
    this.stateService.courseSelectedType$.subscribe((id) => {
      console.log('🟡 Observable selected courseType ID:', id);
    });
  }

  loadCourseTypes() {
    this.loading = true;
    this.error = null;

    this.courseTypeService.getCourseTypes().subscribe({
      next: (data: CourseType[]) => {
        console.log('✅ Received course types from API:', data.map(d => `${d.name} (${d.id})`));

        this.courstypeesList = data
          .filter(item => item.id != null)
          .sort((a, b) => a.id - b.id); // ترتيب واضح حسب ID

        console.log('📦 Sorted course list:', this.courstypeesList);
        this.loading = false;
      },
      error: (err: any) => {
        console.error('❌ Failed to load course types:', err);
        this.error = 'Failed to load course types. Please try again.';
        this.loading = false;
      }
    });
  }

  trackById(index: number, item: CourseType): number {
    return item.id;
  }

  setCourseType(courseTypeId: number, courseName: string) {
    console.log(`🎯 You clicked: ${courseName} (ID: ${courseTypeId})`);

    const isValidId = this.courstypeesList.some(item => item.id === courseTypeId);
    if (!isValidId) {
      console.error('🚫 Invalid course type ID:', courseTypeId);
      return;
    }

    this.stateService.setCourseSelectedType(courseTypeId,courseName);
    this.util.navigateToPage('/my-courses-details');
  }

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/courses_icons/default.png';
    console.warn('🔁 Image fallback to default.');
  }

  changeSelected(name: string) {
    this.selected = name;
  }

  onFilter() {
    this.util.navigateToPage('filter');
  }

  viewCertificate() {
    this.util.navigateToPage('/view-certificate');
  }
}
