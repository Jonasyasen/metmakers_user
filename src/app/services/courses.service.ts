import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CourseType {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  validity: number;
  icon: string;
  color: string;
  image: string;
}

export interface CourseByType {
  id: number;
  title: string;
  location: string;
  description: string;
  capacity: number;
  startdatetime: string;
  enddatetime: string;
  created_at: string;
  updated_at: string;
  course_type: number;
  instructor: number;
  is_registered: boolean;
  enrolled_students:number;
  registration_id: number;
}

export interface StudentInfo {
  student_id: number;
  first_name: string;
  last_name: string;
  email: string;
  valid_competencies: { id: number; name: string }[];
  invalid_competencies: { id: number; name: string }[];
}

export interface CatalogCourse {
  id: number;
  link_name: string;
  image_url: string;
  description: string;
  retail_price: number;
  type_name: string;
  startdatetime: string;
  location: string;
  capacity: number;
  enrolled_students: number;
}

export interface CanvasContent {
  modules: { id: number; name: string; position: number; items: { id: number; title: string; item_type: string; url: string; page_url: string }[] }[];
  pages: { id: number; title: string; body: string }[];
  assignments: { id: number; name: string; points_possible: number | null }[];
  quizzes: { id: number; title: string; points_possible: number | null }[];
}

export interface LaserReservationPayload {
  start_time: string;
  end_time: string;
  notes?: string;
}

export interface LaserReservation {
  id: number;
  student: number;
  machine: number;
  start_time: string;
  end_time: string;
  notes: string;
}

@Injectable({
  providedIn: 'root'
})
export class CourseTypeService {
  private apiUrl = `${environment.apiBaseUrl}/courses/course_type/`;
  private coursesByTypeUrl = `${environment.apiBaseUrl}/courses/upcoming_courses_by_type/`;
  private courseSelectedType: number | null = null;

  constructor(private http: HttpClient) {}

  getCourseTypes(): Observable<CourseType[]> {
    return this.http.get<CourseType[]>(this.apiUrl);
  }

  getCourseType(id: number): Observable<CourseType> {
    return this.http.get<CourseType>(`${this.apiUrl}${id}/`);
  }

  getCoursesByType(courseTypeId: number): Observable<CourseByType[]> {
    return this.http.get<CourseByType[]>(`${this.coursesByTypeUrl}${courseTypeId}/`);
  }

  getCatalogCourses(courseTypeId: number): Observable<CatalogCourse[]> {
    return forkJoin({
      type: this.getCourseType(courseTypeId),
      courses: this.getCoursesByType(courseTypeId),
    }).pipe(map(({ type, courses }) => courses.map((course) => ({
      id: course.id,
      link_name: course.title,
      image_url: type.image || this.fallbackImage(type.name),
      description: course.description,
      retail_price: 0,
      type_name: type.name,
      startdatetime: course.startdatetime,
      location: course.location,
      capacity: course.capacity,
      enrolled_students: course.enrolled_students,
    }))));
  }

  getFeaturedCatalogCourses(): Observable<CatalogCourse[]> {
    return this.getCourseTypes().pipe(
      map((types) => types.slice(0, 6)),
      switchMap((types) => forkJoin(types.map((type) => this.getCatalogCourses(type.id)))),
      map((groups) => groups.reduce((all, group) => all.concat(group), [])),
    );
  }

  getCanvasContent(courseTypeId: number): Observable<CanvasContent> {
    return this.http.get<CanvasContent>(`${environment.apiBaseUrl}/courses/course-types/${courseTypeId}/canvas-content/`);
  }

  setCourseSelectedType(courseTypeId: number | null): void {
    this.courseSelectedType = courseTypeId;
  }

  getSelectedCourseType(): number | null {
    return this.courseSelectedType;
  }

  private fallbackImage(name: string): string {
    return `https://source.unsplash.com/800x500/?${encodeURIComponent(name + ' workshop')}`;
  }

  enrollCourse(courseId: number, studentId: number): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/courses/course_registration/`, {
      course: courseId,
      student: studentId
    });
  }

  cancelCourse(courseId: number): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/courses/course_registration/${courseId}/`);
  }

  getStudentInfo(studentId: number): Observable<any> {
    const url = `${environment.apiBaseUrl}/courses/student_info/${studentId}/`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    };
    return this.http.get<any>(url, { headers });
  }

  getCurrentStudentInfo(): Observable<StudentInfo> {
    return this.http.get<StudentInfo>(`${environment.apiBaseUrl}/courses/student_info/me/`);
  }

  reserveLaserCutter(data: LaserReservationPayload): Observable<any> {
    const url = `${environment.apiBaseUrl}/machines/laser_reservation/`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    };
    return this.http.post<any>(url, data, { headers });
  }

  getLaserReservationsByDate(date: string): Observable<LaserReservation[]> {
    const url = `${environment.apiBaseUrl}/machines/laser_reservations_by_day/`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    };
    const params = new HttpParams().set('date', date);
    return this.http.get<LaserReservation[]>(url, { headers, params });
  }
}
