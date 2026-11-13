import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:8000/api/courses/course_type/';
  private coursesByTypeUrl = 'http://localhost:8000/api/courses/upcoming_courses_by_type/';
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

  setCourseSelectedType(courseTypeId: number | null): void {
    this.courseSelectedType = courseTypeId;
  }

  getSelectedCourseType(): number | null {
    return this.courseSelectedType;
  }

  enrollCourse(courseId: number, studentId: number): Observable<any> {
    return this.http.post('http://localhost:8000/api/courses/course_registration/', {
      course: courseId,
      student: studentId
    });
  }

  cancelCourse(courseId: number): Observable<any> {
    return this.http.delete(`http://localhost:8000/api/courses/course_registration/${courseId}/`);
  }

  getStudentInfo(studentId: number): Observable<any> {
    const url = `http://localhost:8000/api/courses/student_info/${studentId}/`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    };
    return this.http.get<any>(url, { headers });
  }

  reserveLaserCutter(data: LaserReservationPayload): Observable<any> {
    const url = 'http://localhost:8000/api/machines/laser_reservation/';
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    };
    return this.http.post<any>(url, data, { headers });
  }

  getLaserReservationsByDate(date: string): Observable<LaserReservation[]> {
    const url = `http://localhost:8000/api/machines/laser_reservations_by_day/`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    };
    const params = new HttpParams().set('date', date);
    return this.http.get<LaserReservation[]>(url, { headers, params });
  }
}
